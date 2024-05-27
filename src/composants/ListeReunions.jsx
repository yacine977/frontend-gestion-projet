import React, { useEffect, useState } from "react";

function ListeReunions() {
  const [reunions, setReunions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reunion")
      .then((response) => response.json())
      .then((data) => setReunions(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Liste des réunions</h1>
      {reunions.map((reunion) => (
        <div key={reunion.id}>
          <h2>{reunion.sujet}</h2>
          <p>Date et heure : {reunion.dateTime}</p>
          <p>ID du projet : {reunion.projetId}</p>
          <p>ID du créateur : {reunion.createurId}</p>
        </div>
      ))}
    </div>
  );
}

export default ListeReunions;
