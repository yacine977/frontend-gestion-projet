import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/DetailProjet.css";

function DetailProjet() {
  const [projet, setProjet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/projet/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const [projet] = data;
        setProjet(projet);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération du projet : ",
          error
        );
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
      <p>Date de fin réelle : {projet.dateFinReel ? new Date(projet.dateFinReel).toLocaleDateString() : 'Non définie'}</p>
      <p>Chef de projet ID : {projet.chefDeProjetId}</p>
      <p>Est validé : {projet.est_valide ? 'Oui' : 'Non'}</p>
      <div className='button-group'> {/* Ajoutez la classe 'button-group' à la div */}
        <Link to={`/taches-projet/${projet.id}`} className='button'>
          Voir les tâches de ce projet
        </Link>
        <Link to={`/creer-tache/${projet.id}`} className='button'>
          Créer une tâche pour ce projet
        </Link>
        <Link to={`/creer-document/${projet.id}`} className='button'>
          Créer un document pour ce projet
        </Link>
        <Link to={`/documents-projet/${projet.id}`} className='button'>
          Voir les documents de ce projet
        </Link>
      </div>
    </div>
  );
}

export default DetailProjet;
