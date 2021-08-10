const express = require("express");
const app = express();
const notes = require("../data/notes");
const dotenv = require("dotenv");

////////😕
app.parse = express.json();
dotenv.config();

////////

app.get("/", (req, res) => {
  res.send("Api is running......");
});
// api to get whole data from backend
app.get("/api/notes", (req, res) => {
  res.send(notes);
});
// // api to get sigle/perticular data from backend
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  //   console.log(note);
  res.send(note);
});

// defining PORT for app

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is starts on ${PORT} `));
// app.listen(8080, console.log("Server is starts on 8080"));
