import React, { useEffect, useState } from 'react';
import '../styles/ListeDesTaches.css';
import { Link } from 'react-router-dom';


function ListeDesTaches() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tache') // Remplacez par l'URL de votre API
      .then(response => response.json())
      .then(data => setTaches(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

 const deleteTache = async (id) => {
  const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
  if (confirm) {
    const response = await fetch(`http://localhost:3000/tache/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Tâche supprimée avec succès');
      setTaches(taches.filter((tache) => tache.id !== id));
    } else {
      alert('Erreur lors de la suppression de la tâche');
    }
  }
}

  return (
    <div className="container">
      <h1 className="title">Tâches</h1>
      {taches.map((tache, index) => (
        <div key={index} className="tache">
          <h2>{tache.nom}</h2>
          <p>{tache.description}</p>
          <p>Priorité : {tache.priorite}</p>
          <p>Statut : {tache.statut}</p>
        <p>Date de début : {new Date(tache.dateDebut).toLocaleDateString('fr-FR')}</p>
<p>Date de fin prévue : {new Date(tache.dateFinPrevu).toLocaleDateString('fr-FR')}</p>
<p>Date de fin réelle : {new Date(tache.dateFinReel).toLocaleDateString('fr-FR')}</p>
          <p>ID du projet : {tache.projetId}</p>
          <Link to={`/modifier-tache/${tache.id}`} className="button">Modifier</Link>
          <button onClick={() => deleteTache(tache.id)} className="button">Supprimer</button>
         
        </div>
      ))}
    </div>
  );
}

export default ListeDesTaches;