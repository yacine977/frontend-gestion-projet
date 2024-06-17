import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ListeTachesProjetUtilisateur = () => {
  const [taches, setTaches] = useState([]);
  const { projetId } = useParams(); // Récupère l'ID du projet depuis l'URL
  const uid = localStorage.getItem("uid"); // Récupère l'UID de l'utilisateur connecté depuis le localStorage

  useEffect(() => {
    const fetchTaches = async () => {
      if (uid && projetId) {
        try {
          const response = await fetch(`http://localhost:3000/tache/par-utilisateur/${uid}/projet/${projetId}`);
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          const data = await response.json();
          setTaches(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des tâches", error);
        }
      } else {
        console.log("UID ou projetId est undefined, vérifiez le localStorage et l'URL.");
      }
    };

    fetchTaches();
  }, [uid, projetId]); // Exécuter l'effet au montage du composant et à la modification de uid ou projetId

  return (
    <div>
      <h2>Liste des Tâches pour le Projet {projetId}</h2>
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

export default ListeTachesProjetUtilisateur;