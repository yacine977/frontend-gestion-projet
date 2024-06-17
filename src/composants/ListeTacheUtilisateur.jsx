import React, { useState, useEffect } from 'react';

const ListeTacheUtilisateur = () => {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("uid"); // Récupère l'UID depuis le localStorage

    const fetchTaches = async () => {
      if (uid) {
        try {
          const response = await fetch(`http://localhost:3000/tache/par-utilisateur/${uid}`);
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          const data = await response.json();
          setTaches(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des tâches", error);
        }
      } else {
        console.log("UID est undefined, vérifiez le localStorage.");
      }
    };

    fetchTaches();
  }, []); // Exécuter l'effet au montage du composant

  return (
    <div>
      <h2>Liste des Tâches</h2>
      <ul>
        {taches.map(tache => (
          <li key={tache.id}>
            <strong>ID de la tâche:</strong> {tache.id}<br />
            <strong>Description:</strong> {tache.description}<br />
            <strong>Priorité:</strong> {tache.priorite}<br />
            <strong>Statut:</strong> {tache.statut}<br />
            <strong>Date de début:</strong> {tache.dateDebut}<br />
            <strong>Date de fin prévue:</strong> {tache.dateFinPrevu}<br />
            <strong>Date de fin réelle:</strong> {tache.dateFinReel ? tache.dateFinReel : 'Non spécifiée'}<br />
            <strong>ID du projet:</strong> {tache.projetId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeTacheUtilisateur;