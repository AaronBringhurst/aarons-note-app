const express = require("express");
const router = express.Router();
const notesRoutes = require("./notesRoutes");

// Use the notesRoutes for any requests to /notes
router.use("/notes", notesRoutes);

// Define any other routes here if necessary
router.get("/", (req, res) => {
  res.send("API is working");
});

module.exports = router;
