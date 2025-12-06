import React, { useState } from "react";

function PersonForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    const success = onAdd({ name: name.trim(), number: number.trim() });
    if (success) {
      setName("");
      setNumber("");
    }
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
