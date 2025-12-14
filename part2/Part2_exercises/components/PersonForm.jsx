import React, { useState } from "react";

function PersonForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    // onAdd returns a Promise<boolean> — use promise style (.then)
    onAdd({ name: name.trim(), number: number.trim() })
      .then((success) => {
        if (success) {
          setName("");
          setNumber("");
        }
      })
      .catch((err) => {
        // optional: show an error if desired
        console.error("addPerson failed:", err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      <div>
        name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        Phone Number:
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
