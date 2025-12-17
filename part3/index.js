import express from "express";
import morgan from "morgan";
import cors from "cors";
import PhoneBook from "./models/phoneBook.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) =>
  req.method === "POST" && req.body ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unknown Endpoint" });
};

//GET ALL PERSONS
app.get("/api/persons", (req, res) => {
  PhoneBook.find({})
    .then((contacts) => {
      res.status(200).send(contacts);
    })
    .catch((error) => next(error));
});
app.get("/info", (req, res) => {
  PhoneBook.countDocuments({})
    .then((count) => {
      const date = new Date();
      res.send(`<p>Phonebook has info for ${count} people</p> <br> ${date}`);
    })
    .catch((error) => next(error));
});
//GET ONE PERSON
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findById(id)
    .then((personFound) => {
      if (!personFound) {
        res.status(400).send({ error: "Person not found" });
      }
      res.status(200).send(personFound);
    })
    .catch((error) => next(error));
});
//CREATE PERSON
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  // reject missing or empty name/number (covers undefined and empty string)
  if (!body.name || !body.number) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  PhoneBook.findOne({ name: body.name })
    .then((personFound) => {
      if (personFound) {
        res
          .status(400)
          .json({ error: `Person ${body.name} already in Phonebook` });
        return;
      }
      // Create new contact
      const newPerson = new PhoneBook({
        name: body.name,
        number: body.number,
      });

      // Save to database
      newPerson
        .save()
        .then((savedPerson) => {
          res.status(201).json(savedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});
//DELETE PERSON
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBook.findByIdAndDelete(id)
    .then((personFound) => {
      if (!personFound) {
        res.status(400).json({ error: `Person not found` });
      }
      res.status(200).json(personFound);
    })
    .catch((error) => {
      next(error);
    });
});

//Global Error Handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    res.status(400).send({ erro: "Invalid Id" });
  }
  next(error);
};

app.use(unknownEndpoint); //before the error handler middlewhere

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("SERVER LISTENING ON PORT 3001");
});
