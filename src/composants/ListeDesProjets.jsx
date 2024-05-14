
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ListeDesProjets() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/projet')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProjets(data))
      .catch(error => {
        console.error('Une erreur est survenue lors de la récupération des projets : ', error);
      });
  }, []);

 

  return (
    <div>
      <h1>Liste des projets</h1>
      {projets.map(projet => (
        <div key={projet.id}>
          <Link to={`/modifier-projet/${projet.id}`}>Modifier</Link>
          <h2>{projet.nom}</h2>
          <p>{projet.description}</p>
          
          <p>Date de début : {new Date(projet.dateDebut).toLocaleDateString()}</p>
          <p>Date de fin prévue : {new Date(projet.dateFinPrevu).toLocaleDateString()}</p>
          <p>Date de fin réelle : {projet.dateFinReel ? new Date(projet.dateFinReel).toLocaleDateString() : 'N/A'}</p>
          <p>Chef de projet ID : {projet.chefDeProjetId}</p>
          <p>Est validé : {projet.est_valide ? 'Oui' : 'Non'}</p>
          
          
          
        </div>
      ))}
    </div>
  );
}

export default ListeDesProjets;