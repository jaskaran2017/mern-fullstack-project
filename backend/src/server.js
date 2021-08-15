require("dotenv").config();
const express = require("express");
const app = express();
const notes = require("../data/notes");

const connectDB = require("../config/db");
const userRoutes = require("../routers/userRoutes");
// const { notFound, errorHandler } = require("../middleware/ErrorHandler");
////////😕

console.log(process.env.JWT_SECRET);
connectDB();
app.use(express.json());

////////

app.get("/", (req, res) => {
  res.send("Api is running......");
});
// api to get whole data from backend
app.get("/api/notes", (req, res) => {
  res.send(notes);
});
// // api to get sigle/perticular data from backend
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   //   console.log(note);
//   res.send(note);
// });
//////////////
// defining routers now for users

// No. 1 for new user registration
app.use("/api/users", userRoutes);

// middlewares for error handling
// app.use(notFound);
// app.use(errorHandler);

// defining PORT for app

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server is starts on ${PORT} `));
// app.listen(8080, console.log("Server is starts on 8080"));
