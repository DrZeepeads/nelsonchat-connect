// File: server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const rateLimit = require("express-rate-limit");
const path = require("path");

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Load chapters data from JSON file
const dataPath = "./parsed_chapters.json";
let chapters = [];
if (fs.existsSync(dataPath)) {
  chapters = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

// Middleware to save chapters back to JSON
const saveChapters = () => {
  fs.writeFileSync(dataPath, JSON.stringify(chapters, null, 4));
};

// Routes
// 1. Get all chapters (paginated)
app.get("/chapters", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedChapters = chapters.slice(startIndex, endIndex);
  res.json({
    total: chapters.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedChapters,
  });
});

// 2. Get a specific chapter by ID
app.get("/chapters/:id", (req, res) => {
  const { id } = req.params;
  const chapter = chapters.find((chap) => chap.id === id);
  if (chapter) {
    res.json(chapter);
  } else {
    res.status(404).send({ error: "Chapter not found" });
  }
});

// 3. Add a new chapter (admin)
app.post("/chapters", (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    const newChapter = {
      id: uuidv4(),
      title,
      content,
    };

    chapters.push(newChapter);
    saveChapters();
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

// 5. PWA Manifest
app.get("/manifest.json", (req, res) => {
  const manifest = {
    name: "Nelsonbot AI Pediatric Care",
    short_name: "Nelsonbot",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0078d4",
    icons: [
      {
        src: "/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
  res.json(manifest);
});

// Serve static files for the PWA
app.use(express.static(path.join(__dirname, "public")));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});