const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index.js");
const notesRoutes = require("./routes/notesRoutes");
const PORT = process.env.PORT || 3001;

const app = express();

// middleware needs to built here:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/api", notesRoutes);

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
  );
  

app.listen(PORT, () =>
  console.log(`App listening at httpL//localhost:${PORT}`)
);
