const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const notesFilePath = path.join(__dirname, "../db/db.json");

// Helper function to read notes from the JSON file
const readNotesFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write notes to the JSON file
const writeNotesToFile = (filePath, notes) => {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};

// Get all notes
router.get("/", (req, res) => {
  try {
    const notes = readNotesFromFile(notesFilePath);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to read notes" });
  }
});

// Post a new note
router.post("/", (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging log
    const notes = readNotesFromFile(notesFilePath);
    const newNote = {
      id: notes.length ? notes[notes.length - 1].id + 1 : 1,
      title: req.body.title,
      text: req.body.text, // Ensure this matches your client-side code's property
    };
    notes.push(newNote);
    writeNotesToFile(notesFilePath, notes);
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error saving note:", error); // Debugging log
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Delete a note
router.delete("/:id", (req, res) => {
  try {
    const notes = readNotesFromFile(notesFilePath);
    const noteId = parseInt(req.params.id, 10);
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    writeNotesToFile(notesFilePath, updatedNotes);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
