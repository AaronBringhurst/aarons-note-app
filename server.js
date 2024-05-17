const express = require("express");
const path = require("path");
const api = require("./routes"); // This will import the index.js from routes directory
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Routes
app.use("/api", api);

// Serve index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Serve notes.html when /notes is accessed
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Serve 404 page for all other routes
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/404.html"))
);

// Start server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
