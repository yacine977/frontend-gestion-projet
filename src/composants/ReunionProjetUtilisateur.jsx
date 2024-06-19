import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ReunionProjetUtilisateur() {
  const [reunions, setReunions] = useState([]);
  const { projetId } = useParams();
  const createurId = localStorage.getItem("uid"); // Récupérer l'ID de l'utilisateur depuis le localStorage

  useEffect(() => {
    // Modifier l'URL pour inclure l'ID du créateur
    fetch(`http://localhost:3000/reunion/par-projet/${projetId}/${createurId}`)
      .then(response => response.json())
      .then(data => {
        setReunions(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, [projetId, createurId]); // Ajouter createurId aux dépendances pour refaire la requête si l'ID du créateur change

  return (
    <div>
      <h2>Mes réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3>{reunion.sujet}</h3>
            <p>Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
            
            
            {/* Ici, vous pouvez ajouter des actions spécifiques à l'utilisateur, comme modifier ou supprimer ses réunions */}
          </div>
        ))
      ) : (
        <p>Pas de réunions pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default ReunionProjetUtilisateur;