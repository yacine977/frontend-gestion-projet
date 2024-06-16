import React, { useEffect, useState } from "react";
import "../styles/ListeDesTaches.css";
import { Link } from "react-router-dom";

// Composant ListeDesTaches pour afficher et gérer une liste de tâches
function ListeDesTaches() {
  // État local pour stocker les tâches récupérées de l'API
  const [taches, setTaches] = useState([]);

  // Utilisation de useEffect pour charger les données des tâches au montage du composant
  useEffect(() => {
    // Appel à l'API pour récupérer les tâches
    fetch("http://localhost:3000/tache") // Remplacez par l'URL de votre API
      .then((response) => response.json())
      .then((data) => setTaches(data)) // Mise à jour de l'état avec les données reçues
      .catch((error) => console.error("Erreur:", error)); // Gestion des erreurs
  }, []);

  // Fonction pour supprimer une tâche
  const deleteTache = async (id) => {
    // Confirmation de la suppression
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette tâche ?"
    );
    if (confirm) {
      // Appel à l'API pour supprimer la tâche
      const response = await fetch(`http://localhost:3000/tache/${id}`, {
        method: "DELETE",
      });

      // Gestion de la réponse de l'API
      if (response.ok) {
        alert("Tâche supprimée avec succès");
        // Mise à jour de l'état pour retirer la tâche supprimée de la liste
        setTaches(taches.filter((tache) => tache.id !== id));
      } else {
        alert("Erreur lors de la suppression de la tâche");
      }
    }
  };

  // Rendu du composant
  return (
    <div className="container">
      <h1 className="title">Tâches</h1>
      {taches.map((tache, index) => (
        <div key={index} className="tache">
          <h2>{tache.nom}</h2>
          <p>{tache.description}</p>
          <p>Priorité : {tache.priorite}</p>
          <p>Statut : {tache.statut}</p>
          <p>
            Date de début :{" "}
            {new Date(tache.dateDebut).toLocaleDateString("fr-FR")}
          </p>
          <p>
            Date de fin prévue :{" "}
            {new Date(tache.dateFinPrevu).toLocaleDateString("fr-FR")}
          </p>
          <p>
            Date de fin réelle :{" "}
            {new Date(tache.dateFinReel).toLocaleDateString("fr-FR")}
          </p>
          <p>ID du projet : {tache.projetId}</p>
          <Link to={`/modifier-tache/${tache.id}`} className="button">
            Modifier
          </Link>
          <button onClick={() => deleteTache(tache.id)} className="button">
            Supprimer
          </button>
      

        </div>
      ))}
    </div>
  );
}

export default ListeDesTaches;
