import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  // New state: search query
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch JSON data
  const fetchJsonData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/notes");
      setJsonData(res.data || []);
    } catch (err) {
      console.error("error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchJsonData();
  }, []);

  // Filter persons based on search query
  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addPerson = ({ name, number }) => {
    if (persons.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in the list`);
      return false;
    }

    const newPerson = { name, number };
    setPersons((prev) => [...prev, newPerson]);

    return true;
  };

  return (
    <div>
      <div className="json-data">
        <ul>
          {jsonData.map((item) => (
            <li key={item.id ?? item._id ?? JSON.stringify(item)}>
              {item.content}
            </li>
          ))}
        </ul>
      </div>

      <h2>Phonebook</h2>
      <Search handleSearchOnChange={handleSearchOnChange} value={searchQuery} />
      <PersonForm onAdd={addPerson} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  );
};

export default App;
