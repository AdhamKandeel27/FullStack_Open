import { useState, useEffect } from "react";
import axios from "axios";
import { addPersonService, deletePersonService } from "./services";
import Search from "../components/Search";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchPersons = () => {
    const promiseObject = axios.get("http://localhost:3001/persons");
    console.log(promiseObject);
    const personsResponsePromiseObject = promiseObject.then((response) => {
      return response.data;
    }); //aslo written as response => response.data 3alatool
    console.log(personsResponsePromiseObject);
    personsResponsePromiseObject.then((personsObject) =>
      setPersons(personsObject)
    );
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    try {
      const promiseObjectResponse = deletePersonService(id);
      console.log("delete Promise Obj Response:", promiseObjectResponse);
      promiseObjectResponse.then(personResponse=>setPersons(prev=>prev.filter(person=>person.id!==personResponse.id)))
    } catch (error) {
      alert("something went wrong");
    }
  };

  const addPerson = ({ name, number }) => {
    if (persons.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in the list`);
      return false;
    }

    try {
      const addedPersonPromiseObject = addPersonService({ name, number });
      addedPersonPromiseObject.then((addedPersonObject) =>
        setPersons([...persons, addedPersonObject])
      );
    } catch (err) {}
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchOnChange={handleSearchOnChange} value={searchQuery} />
      <PersonForm onAdd={addPerson} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
