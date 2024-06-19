import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ReunionProjetUtilisateur() {
  const [reunions, setReunions] = useState([]);
  const { projetId } = useParams();
  const createurId = localStorage.getItem("uid"); // Récupérer l'ID de l'utilisateur depuis le localStorage

  useEffect(() => {
    fetch(`http://localhost:3000/reunion/par-projet/${projetId}/${createurId}`)
      .then(response => response.json())
      .then(data => {
        setReunions(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, [projetId, createurId]);

  const ajouterParticipant = (reunionId) => {
    const utilisateurId = prompt("Entrez l'ID de l'utilisateur à ajouter :"); // Utilisez une modal pour une meilleure expérience utilisateur
    if (!utilisateurId) return; // Sortie si aucun ID n'est fourni

    fetch('http://localhost:3000/reunion/ajouter-utilisateur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reunionId, utilisateurId }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Participant ajouté avec succès!');
      // Vous pouvez ici rafraîchir la liste des réunions ou mettre à jour l'interface utilisateur comme nécessaire
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du participant:', error);
      alert('Erreur lors de l\'ajout du participant');
    });
  };

  return (
    <div>
      <h2>Mes réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3>{reunion.sujet}</h3>
            <p>Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
            <button onClick={() => ajouterParticipant(reunion.id)}>Ajouter un participant</button>
          </div>
        ))
      ) : (
        <p>Pas de réunions pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default ReunionProjetUtilisateur;