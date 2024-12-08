const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const nelsonDir = path.join(__dirname, 'nelson book');
const outputFile = path.join(__dirname, 'parsed_chapters.json');

async function parsePDFs() {
  const chapters = [];
  const files = fs.readdirSync(nelsonDir);

  for (const file of files) {
    if (file.endsWith('.pdf')) {
      const dataBuffer = fs.readFileSync(path.join(nelsonDir, file));
      const data = await pdf(dataBuffer);
      chapters.push({
        title: file.replace('.pdf', ''),
        content: data.text
      });
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(chapters, null, 2));
  console.log(`Parsed ${chapters.length} chapters to ${outputFile}`);
}

parsePDFs();