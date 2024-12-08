const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load chapters data from JSON file
let chapters = [];
const dataPath = "./parsed_chapters.json"; // Path to the JSON file
if (fs.existsSync(dataPath)) {
  chapters = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

// Routes
// 1. Get all chapters
app.get("/chapters", (req, res) => {
  res.json(chapters);
});

// 2. Get a specific chapter by ID
app.get("/chapters/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < chapters.length) {
    res.json(chapters[id]);
  } else {
    res.status(404).send({ error: "Chapter not found" });
  }
});

// 3. Add a new chapter (admin)
app.post("/chapters", (req, res) => {
  const newChapter = req.body;
  if (newChapter.title && newChapter.content) {
    chapters.push(newChapter);
    // Save to JSON file
    fs.writeFileSync(dataPath, JSON.stringify(chapters, null, 4));
    res.status(201).send(newChapter);
  } else {
    res.status(400).send({ error: "Invalid chapter format" });
  }
});

// 4. Search chapters
app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const results = chapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(query) ||
      chapter.content.toLowerCase().includes(query)
  );
  res.json(results);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});