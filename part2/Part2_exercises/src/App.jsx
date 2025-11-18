import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameOnChange = (e) => {
    setNewName(e.target.value);
  };

  const isDuplicate = (name) => {
    return persons.some((person) => person.name === name);
    //.some() return true
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (isDuplicate(newName)) {alert(`${newName} is already in the list`);return;}
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmission}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
