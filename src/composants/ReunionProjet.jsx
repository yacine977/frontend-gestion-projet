import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ReunionProjet() {
  const [reunions, setReunions] = useState([]);
  const { projetId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/reunion/par-projet/${projetId}`)
      .then(response => response.json())
      .then(data => {
        setReunions(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, [projetId]);

  // Fonction pour supprimer une réunion
  const supprimerReunion = (id) => {
  // Affiche une fenêtre de confirmation
  const estConfirme = window.confirm('Êtes-vous sûr de vouloir supprimer cette réunion ?');
  if (!estConfirme) {
    // Si l'utilisateur clique sur "Annuler", arrête la fonction
    return;
  }

  // Continue avec la suppression si l'utilisateur confirme
  fetch(`http://localhost:3000/reunion/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    // Mise à jour de l'état pour refléter la suppression
    setReunions(reunions.filter(reunion => reunion.id !== id));
  })
  .catch(error => console.error('Erreur lors de la suppression:', error));
};

  return (
    <div>
      <h2>Réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3>{reunion.sujet}</h3>
            <p>Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
            <p>ID du projet : {reunion.projetId}</p>
            <p>ID du créateur : {reunion.createurId}</p>
            {/* ... Afficher d'autres détails de la réunion comme vous le souhaitez */}
            <button onClick={() => supprimerReunion(reunion.id)}>Supprimer la réunion</button>
          </div>
        ))
      ) : (
        <p>Pas de réunions pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default ReunionProjet;