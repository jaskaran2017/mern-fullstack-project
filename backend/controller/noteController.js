const Note = require("../model/noteModel");
const async_handler = require("express-async-handler");

// controller for reading all notes from database
const getNotes = async (req, res) => {
  // console.log(req.headers);
  try {
    const notes = await Note.find({ user: req.user._id }); // the user object inside find() coming from middleware
    res.json(notes);
    console.log(notes);
  } catch (error) {
    res.status(400);
    throw new Error("Not found");
  }
};
const getNoteById = async_handler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

// constroller for creating new notes and saving them to database
const createNotes = async_handler(async (req, res) => {
  // console.log(req.headers)
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("All fields are required");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
    console.log(createNote);
  }
});

module.exports = { getNotes, getNoteById, createNotes };
