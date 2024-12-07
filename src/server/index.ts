import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Read and parse PDF file
const dataBuffer = fs.readFileSync(path.join(__dirname, 'nelson.pdf'));

let pdfContent = '';
pdf(dataBuffer).then(data => {
  pdfContent = data.text;
});

// Search endpoint
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Simple search implementation
    const sentences = pdfContent.split(/[.!?]+/);
    const results = sentences
      .filter(sentence => 
        sentence.toLowerCase().includes(query.toLowerCase())
      )
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);

    return res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});