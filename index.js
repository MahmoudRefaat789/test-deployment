const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  const note = notes.find((note) => note.id === id);
  if (!note) {
    return res.status(404).send("Note Not Found");
  }
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  const note = notes.filter((note) => note.id !== id);
  res.send("Process Successed");
});

const generateId = () => {
  let maxId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(404).json({ msg: "Posted Failed" });
  }

  let note = {
    content: body.content,
    important: body.important,
    id: generateId(),
  };

  note = { ...notes, note };

  res.json(note);
});

app.patch("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  let note = notes.find((note) => note.id === id);
  note = { ...note, ...req.body };

  res.json(note);
});

app.listen(PORT, () => {
  console.log("App is listening on port 3001");
});
