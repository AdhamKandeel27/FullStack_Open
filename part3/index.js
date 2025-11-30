import express from "express";

const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//GET ALL PERSONS
app.get("/api/persons", (req, res) => {
  res.status(200).send(persons);
});
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <br> ${date}`
  );
});
//GET ONE PERSON
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }
  res.status(200).send(person);
});
//CREATE PERSON
app.post("/api/persons", (req, res) => {
  const body = req.body;
  const personFound = persons.find((person) => person.id === body.id);
  if (personFound) {
    res.status(400).json({ error: `Person ${body.name} already in Phonebook` });
    return;
  }
  persons.push({ id: Math.floor(Math.random() * 10) + 1, ...body });
  //above is not logical but just for the sake of the exercise
  res.status(201).send(`Person ${body.name} added !`);
});
//DELETE PERSON
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  return res.status(204).end();
});

app.listen(3001, () => {
  console.log("SERVER LISTENING ON PORT 3001");
});
