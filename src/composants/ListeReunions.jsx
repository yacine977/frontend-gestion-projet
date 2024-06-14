import React, { useEffect, useState } from "react";

// Composant ListeReunions pour afficher et gérer une liste de réunions
function ListeReunions() {
  // État pour stocker les réunions récupérées de l'API
  const [reunions, setReunions] = useState([]);

  // Charger les réunions au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/reunion")
      .then((response) => response.json())
      .then((data) => setReunions(data)) // Mise à jour de l'état avec les réunions récupérées
      .catch((error) =>
        console.error("Erreur lors de la récupération des réunions:", error)
      ); // Gestion des erreurs
  }, []);

  // Fonction pour supprimer une réunion
  const supprimerReunion = async (id) => {
    // Demande de confirmation avant suppression
    if (!window.confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
      return;
    }
    const response = await fetch(`http://localhost:3000/reunion/${id}`, {
      method: "DELETE",
    });

    // Gestion de la réponse de l'API
    if (response.ok) {
      alert("Réunion supprimée avec succès");
      // Mise à jour de l'état pour retirer la réunion supprimée de la liste
      setReunions(reunions.filter((reunion) => reunion.id !== id));
    } else {
      alert("Erreur lors de la suppression de la réunion");
    }
  };

  // Rendu du composant
  return (
    <div>
      <h1>Liste des réunions</h1>
      {reunions.map((reunion, index) => (
        <div key={index}>
          {" "}
          {/* Clé basée sur l'index pour l'itération, à éviter si possible pour des raisons de performance et de cohérence des données */}
          <h2>{reunion.sujet}</h2>
          <p>Date et heure : {reunion.dateTime}</p>
          <p>Nom du projet : {reunion.nomProjet}</p>
          <p>Nom du créateur : {reunion.nomCreateur}</p>
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
