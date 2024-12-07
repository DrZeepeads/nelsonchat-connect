import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Create directories for both volumes
const volume1Dir = path.join(__dirname, 'Nelson book of pediatrics volume 1');
const volume2Dir = path.join(__dirname, 'Nelson book of pediatrics volume 2');

if (!fs.existsSync(volume1Dir)) {
  fs.mkdirSync(volume1Dir, { recursive: true });
}

if (!fs.existsSync(volume2Dir)) {
  fs.mkdirSync(volume2Dir, { recursive: true });
}

// Read and parse PDF files
let volume1Content = '';
let volume2Content = '';

try {
  const volume1Buffer = fs.readFileSync(path.join(volume1Dir, 'nelson_vol1.pdf'));
  const volume2Buffer = fs.readFileSync(path.join(volume2Dir, 'nelson_vol2.pdf'));

  Promise.all([
    pdf(volume1Buffer),
    pdf(volume2Buffer)
  ]).then(([data1, data2]) => {
    volume1Content = data1.text;
    volume2Content = data2.text;
    console.log('PDF files loaded successfully');
  }).catch(err => {
    console.error('Error parsing PDF files:', err);
  });
} catch (err) {
  console.error('Error reading PDF files:', err);
}

const searchHandler = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const volume = req.query.volume as string;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
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
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);

    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.get('/api/search', searchHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});