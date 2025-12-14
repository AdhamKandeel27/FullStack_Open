import React from "react";

function Persons({ filteredPersons, handleDelete }) {
  return (
    <div>
      <ul>
        {filteredPersons.map((p) => (
          <li
            style={{
              marginBottom: "10px",
            }}
            key={p.id}
          >
            {p.name} {p.number}
            <button
              style={{
                marginLeft: "20px",
              }}
              type="button"
              onClick={() => {
                window.confirm(`delete ${p.name}?`)
                handleDelete(p.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Persons;
