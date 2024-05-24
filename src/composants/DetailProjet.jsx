import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function DetailProjet() {
  const [projet, setProjet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/projet/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Ajout de console.log ici
        const [projet] = data; // Déstructure le tableau pour obtenir le premier élément
        setProjet(projet);
      })
      .catch(error => {
        console.error('Une erreur est survenue lors de la récupération du projet : ', error);
      });
  }, [id]);

  if (!projet) {
    return <div>Chargement...</div>;
  }

  return (
    <div className='detail-projet'>
      <h1>{projet.nom}</h1>
      <p>{projet.description}</p>
      <p>Date de début : {new Date(projet.dateDebut).toLocaleDateString()}</p>
      <p>Date de fin prévue : {new Date(projet.dateFinPrevu).toLocaleDateString()}</p>
      <p>Date de fin réelle : {projet.dateFinReel ? new Date(projet.dateFinReel).toLocaleDateString() : 'Non défini'}</p>
      <p>Chef de projet ID : {projet.chefDeProjetId}</p>
      <p>Est validé : {projet.est_valide ? 'Oui' : 'Non'}</p>
      <Link to={`/taches-projet/${projet.id}`} className='button'>
        Voir les tâches de ce projet
      </Link>
      
      

    </div>
  );
}

export default DetailProjet;