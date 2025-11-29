import { useState , useEffect} from "react";
import axios from "axios";

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "0101010101" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const fetchJsonData = async () => {
    const promise = axios.get("http://localhost:3001/notes");
    promise
      .then((res) => {
        setJsonData(res.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  useEffect(() => {
    fetchJsonData();
  }, []);

  const handleSearchOnChange = (e) => {
    if (e.target.value === "") {
      setFilteredPersons(persons);
      return;
    }
    setFilteredPersons(
      persons.filter((person) => person.name.includes(e.target.value))
    );
  };

  const handleNameOnChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneNumberOnChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const isDuplicate = (name) => {
    return persons.some((person) => person.name === name);
    //.some() return true
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (isDuplicate(newName)) {
      alert(`${newName} is already in the list`);
      return;
    }
    setPersons([...persons, { name: newName, phoneNumber: phoneNumber }]);
    setFilteredPersons([
      ...filteredPersons,
      { name: newName, phoneNumber: phoneNumber },
    ]);
    setNewName("");
    setPhoneNumber("");
  };

  return (
    <div>
      <div className="json-data">
        <ul>
          {jsonData.map((item) => {
            return <li key={item.id}>{item.content}</li>;
          })}
        </ul>
      </div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <input type="text" onChange={handleSearchOnChange} />
      <form onSubmit={handleFormSubmission}>
        <h2>add a new</h2>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameOnChange} />
        </div>
        <div>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberOnChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((p) => (
          <li key={p.name}>{p.name + " " + p.phoneNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
