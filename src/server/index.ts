import express, { Request, Response } from 'express';
import { Database } from 'sqlite3';
import * as pdfParse from 'pdf-parse';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Initialize SQLite database with FTS5
const db = new Database('nelson.db', (err) => {
  if (err) {
    console.error('Database initialization error:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create FTS5 table for full-text search
    db.run(`
      CREATE VIRTUAL TABLE IF NOT EXISTS nelson_content USING fts5(
        page_number,
        content,
        title,
        tokenize='porter unicode61'
      )
    `);
  }
});

// PDF processing endpoint
app.post('/api/process-pdf', async (req: Request, res: Response) => {
  try {
    const pdfPath = path.resolve(__dirname, 'nelson.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    
    const data = await pdfParse(dataBuffer);
    
    // Process PDF content page by page
    const pages = data.text.split(/\f/); // Split by form feed character
    
    // Insert pages into SQLite
    const stmt = db.prepare('INSERT INTO nelson_content (page_number, content, title) VALUES (?, ?, ?)');
    
    pages.forEach((content, index) => {
      stmt.run(index + 1, content.trim(), `Page ${index + 1}`);
    });
    
    stmt.finalize();
    
    res.json({ success: true, pageCount: pages.length });
  } catch (error) {
    console.error('PDF processing error:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

// Search endpoint
app.get('/api/search', (req: Request, res: Response) => {
  const query = req.query.q as string;
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter required' });
  }
  
  db.all(
    `SELECT page_number, title, snippet(nelson_content, 2, '<b>', '</b>', '...', 64) as excerpt
     FROM nelson_content 
     WHERE content MATCH ? 
     ORDER BY rank`,
    query,
    (err, rows) => {
      if (err) {
        console.error('Search error:', err);
        return res.status(500).json({ error: 'Search failed' });
      }
      res.json({ results: rows });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});