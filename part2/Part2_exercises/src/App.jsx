import { useState, useEffect } from "react";
import axios from "axios";
import {
  addPersonService,
  deletePersonService,
  updatePersonNumberService,
} from "./services";
import Search from "../components/Search";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Notification from "../components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");

  const showNotification = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(null), 4000);
  };

  const fetchPersons = () => {
    const promiseObject = axios.get("http://localhost:3001/api/persons");
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
      promiseObjectResponse.then((personResponse) =>
        setPersons((prev) =>
          prev.filter((person) => person.id !== personResponse.id)
        )
      );
    } catch (error) {
      alert("something went wrong");
    }
  };

  const addPerson = ({ name, number }) => {
    const existing = persons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      if (existing.number === number) {
        alert(`${name} is already in the list with the same number`);
        return Promise.resolve(false);
      }

      const ok = window.confirm(
        `${name} is already added to the phonebook. Replace the old number with the new one?`
      );
      if (!ok) return Promise.resolve(false);

      // use promise-based flow
      return updatePersonNumberService(existing.id, { ...existing, number })
        .then((updated) => {
          setPersons((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
          );
          showNotification("Updated contact", "success");
          return true;
        })
        .catch((error) => {
          console.error("failed to update number:", error);
          if (error?.response?.status === 404) {
            setPersons((prev) => prev.filter((p) => p.id !== existing.id));
            alert(
              `Information of ${name} has already been removed from server`
            );
          } else {
            const errMsg =
              error?.response?.data?.error ||
              "Failed to update the person's number";
            showNotification(errMsg, "error");
          }
          return false;
        });
    }

    // Person does not exist: create new (promise chain)
    return addPersonService({ name, number })
      .then((saved) => {
        setPersons((prev) => [...prev, saved]);
        showNotification("Added to phonebook", "success");
        return true;
      })
      .catch((err) => {
        console.error("failed to save person:", err);
        const errMsg =
          err?.response?.data?.error || "Failed to save person to server";
        showNotification(errMsg, "error");
        return false;
      });
  };

  return (
    <div>
      {notificationMessage && (
        <Notification message={notificationMessage} type={notificationType} />
      )}
      <h2>Phonebook</h2>
      <Search handleSearchOnChange={handleSearchOnChange} value={searchQuery} />
      <PersonForm onAdd={addPerson} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
