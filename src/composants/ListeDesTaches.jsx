import React, { useEffect, useState } from 'react';
import '../styles/ListeDesTaches.css';

function ListeDesTaches() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tache') // Remplacez par l'URL de votre API
      .then(response => response.json())
      .then(data => setTaches(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Tâches</h1>
      {taches.map((tache, index) => (
        <div key={index} className="tache">
          <h2>{tache.nom}</h2>
          <p>{tache.description}</p>
          <p>Priorité : {tache.priorite}</p>
          <p>Statut : {tache.statut}</p>
          <p>Date de début : {tache.dateDebut}</p>
          <p>Date de fin prévue : {tache.dateFinPrevu}</p>
          <p>Date de fin réelle : {tache.dateFinReel}</p>
          <p>ID du projet : {tache.projetId}</p>
        </div>
      ))}
    </div>
  );
}

export default ListeDesTaches;