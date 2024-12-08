import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { SearchResponse, SearchError } from '../types/search';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const baseDir = path.resolve(__dirname, '../../');
const volume1Dir = path.join(baseDir, 'Nelson book of pediatrics volume 1');
const volume2Dir = path.join(baseDir, 'Nelson book of pediatrics volume 2');
const textFilesDir = path.join(__dirname, 'text-files');

console.log('Base directory:', baseDir);
console.log('Volume 1 directory:', volume1Dir);
console.log('Volume 2 directory:', volume2Dir);
console.log('Text files directory:', textFilesDir);

[volume1Dir, volume2Dir, textFilesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

let volume1Content = '';
let volume2Content = '';

try {
  const volume1Buffer = fs.readFileSync(path.join(volume1Dir, 'nelson_vol1.pdf'));
  console.log('Successfully read Volume 1 PDF');
  
  pdf(volume1Buffer).then(data => {
    volume1Content = data.text;
    console.log('Successfully parsed Volume 1 PDF');
  }).catch(err => {
    console.error('Error parsing Volume 1 PDF:', err);
  });

  try {
    const volume2Buffer = fs.readFileSync(path.join(volume2Dir, 'nelson_vol2.pdf'));
    pdf(volume2Buffer).then(data => {
      volume2Content = data.text;
      console.log('Successfully parsed Volume 2 PDF');
    }).catch(err => {
      console.error('Error parsing Volume 2 PDF:', err);
    });
  } catch (err) {
    console.log('Volume 2 not found yet');
  }
} catch (err) {
  console.error('Error reading PDF files:', err);
}

// Fix the route handler typing
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const volume = req.query.volume as string;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' } as SearchError);
    }

    let contentToSearch = '';
    if (volume === '1') {
      contentToSearch = volume1Content;
    } else if (volume === '2') {
      contentToSearch = volume2Content;
    } else {
      contentToSearch = volume1Content + '\n' + volume2Content;
    }

    const sentences = contentToSearch.split(/[.!?]+/);
    const results = sentences
      .filter(sentence => 
        sentence.toLowerCase().includes(query.toLowerCase())
      )
      .map(sentence => ({
        text: sentence.trim(),
        volume: volume || 'all',
        relevance: sentence.toLowerCase().split(query.toLowerCase()).length - 1
      }))
      .filter(result => result.text.length > 0)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10);

    return res.json({ results } as SearchResponse);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Internal server error' } as SearchError);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;