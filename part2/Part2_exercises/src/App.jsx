import { useState, useEffect } from "react";
import axios from "axios";
import addPersonService from "./services";
import Search from "../components/Search";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [persons, setPersons] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchJsonData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/persons");
      setJsonData(res.data || []);
      setPersons(res.data);
    } catch (err) {
      console.error("error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchJsonData();
  }, []);

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addPerson = async ({ name, number }) => {
    if (persons.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in the list`);
      return false;
    }

    try {
      const saved = await addPersonService({ name, number });
      setPersons((prev) => [...prev, saved]);
      return true;
    } catch (err) {
      console.error("failed to save person:", err);
      alert("Failed to save person to server");
      return false;
    }
  };

  return (
    <div>

      <h2>Phonebook</h2>
      <Search handleSearchOnChange={handleSearchOnChange} value={searchQuery} />
      <PersonForm onAdd={addPerson} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
