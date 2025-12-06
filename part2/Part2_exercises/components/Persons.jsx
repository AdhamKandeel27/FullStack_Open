import React from "react";

function Persons({filteredPersons}) {
  return (
    <div>
      <ul>
        {filteredPersons.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Persons;
