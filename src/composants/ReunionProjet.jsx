import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ReunionProjet.css'; // Assurez-vous d'importer le fichier CSS modifié

function ReunionProjet() {
  const [reunions, setReunions] = useState([]);
  const { projetId } = useParams();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetch(`http://localhost:3000/reunion/par-projet/${projetId}`)
      .then(response => response.json())
      .then(data => {
        setReunions(data);
      })
      .catch(error => console.error('Erreur:', error));
  }, [projetId]);

  const supprimerReunion = (id) => {
    const estConfirme = window.confirm('Êtes-vous sûr de vouloir supprimer cette réunion ?');
    if (!estConfirme) {
      return;
    }

    fetch(`http://localhost:3000/reunion/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setReunions(reunions.filter(reunion => reunion.id !== id));
    })
    .catch(error => console.error('Erreur lors de la suppression:', error));
  };

  return (
    <div id="reunion-container">
      <h2 id="reunion-title">Réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3 id="reunion-subtitle">{reunion.sujet}</h3>
            <p id="reunion-info">Créateur: {reunion.nom} {reunion.prenom}</p> {/* Affichage du nom et prénom du créateur */} 
            <p id="reunion-info">Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
            {(role === "PDG" || role === "ChefDeProjet") && (
              <>
                <Link id="link" to={`/modifier-reunion/${reunion.id}`}>Modifier la réunion</Link>
                <button id="button" onClick={() => supprimerReunion(reunion.id)}>Supprimer la réunion</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Pas de réunions pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default ReunionProjet;