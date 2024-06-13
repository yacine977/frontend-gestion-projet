import React, { useEffect, useState } from "react";

function ListeReunions() {
  const [reunions, setReunions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reunion")
      .then((response) => response.json())
      .then((data) => setReunions(data))
      .catch((error) => console.error(error));
  }, []);

  const supprimerReunion = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
      return;
    }
    const response = await fetch(`http://localhost:3000/reunion/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Réunion supprimée avec succès");
      setReunions(reunions.filter((reunion) => reunion.id !== id));
    } else {
      alert("Erreur lors de la suppression de la réunion");
    }
  };

  return (
    <div>
      <h1>Liste des réunions</h1>
      {reunions.map((reunion, index) => (
        <div key={index}> {/* Utilisation de l'index comme clé est généralement une mauvaise pratique sauf si la liste ne change jamais */}
          <h2>{reunion.sujet}</h2>
          <p>Date et heure : {reunion.dateTime}</p>
          <p>Nom du projet : {reunion.nomProjet}</p>
          <p>Nom du créateur : {reunion.nomCreateur}</p> {/* Ajout de cette ligne pour afficher le nom du créateur */}
          <a href={`/modifier-reunion/${reunion.id}`}>Modifier</a>
          <button onClick={() => supprimerReunion(reunion.id)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListeReunions;