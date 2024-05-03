const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
const db = new sqlite3.Database(":memory:");

// Create Posts table
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT, tag TEXT, image TEXT)"
  );
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all posts with options for sorting, pagination, keyword search, and tag filter
app.get("/api/posts", (req, res) => {
  let query = "SELECT * FROM posts";

  const { sort, page, keyword, tag } = req.query;

  // Sorting
  if (sort) {
    query += ` ORDER BY ${sort}`;
  }

  // Pagination
  const limit = 10;
  const offset = (page - 1) * limit || 0;
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  // Keyword search
  if (keyword) {
    query += ` WHERE title LIKE '%${keyword}%' OR desc LIKE '%${keyword}%'`;
  }

  // Tag filter
  if (tag) {
    // Append tag filter if other conditions already exist
    if (keyword) {
      query += ` AND tag = '${tag}'`;
    } else {
      // Otherwise, start a new WHERE clause with the tag filter
      query += ` WHERE tag = '${tag}'`;
    }
  }

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

// Insert a new post
app.post("/api/posts", (req, res) => {
  const { title, desc, tag, image } = req.body;

  db.run(
    "INSERT INTO posts (title, desc, tag, image) VALUES (?, ?, ?, ?)",
    [title, desc, tag, image],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Post created successfully", id: this.lastID });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
