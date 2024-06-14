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

  return (
    <div>
  <h2>Réunions pour ce projet :</h2>
{reunions.length > 0 ? (
  reunions.map((reunion, index) => (
    <div key={reunion.id || index}>
      <h3>{reunion.sujet}</h3>
      <p>Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
      <p>ID du projet : {reunion.projetId}</p>
      <p>ID du créateur : {reunion.createurId}</p>
      {/* ... Afficher d'autres détails de la réunion comme vous le souhaitez */}
      // Ajout du bouton de suppression de la réunion
      
    </div>
  ))
) : (
  <p>Pas de réunions pour ce projet pour le moment...</p>
)}
</div>
  );
}
 
export default ReunionProjet;