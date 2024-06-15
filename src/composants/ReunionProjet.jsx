import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ReunionProjet() {
  const [reunions, setReunions] = useState([]);
  const { projetId } = useParams();
  const role = localStorage.getItem("role"); // Étape 1: Récupérer le rôle de l'utilisateur

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
    <div>
      <h2>Réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3>{reunion.sujet}</h3>
            <p>Date et heure : {new Date(reunion.dateTime).toLocaleString('fr-FR')}</p>
            <p>ID du projet : {reunion.projetId}</p>
            <p>ID du créateur : {reunion.createurId}</p>
            {/* Étape 2 et 3: Affichage conditionnel en fonction du rôle */}
            {(role === "PDG" || role === "ChefDeProjet") && (
              <>
                <Link to={`/modifier-reunion/${reunion.id}`}>Modifier la réunion</Link>
                <button onClick={() => supprimerReunion(reunion.id)}>Supprimer la réunion</button>
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