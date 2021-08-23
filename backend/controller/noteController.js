const Note = require("../model/noteModel");
const async_handler = require("express-async-handler");

// controller for reading all notes from database
const getNotes = async_handler(async (req, res) => {
  // console.log(req.headers)
  const notes = await Note.find({ user: req.user._id }); // the user object inside find() come from middleware
  res.json(notes);
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
  }
});



module.exports = { getNotes, createNotes };
