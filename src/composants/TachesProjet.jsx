import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/ListeDesTaches.css";

function TachesProjet() {
  const [taches, setTaches] = useState([]);
  const { projetId } = useParams();

  useEffect(() => {
    console.log("Projet ID:", projetId);
    fetch(`http://localhost:3000/tache/projet/${projetId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Tâches:", data);
        setTaches(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, [projetId]);
  

  return (
    <div className="container">
      <h2>Tâches pour ce projet :</h2>
      {taches.length > 0 ? (
        taches.map((tache, index) => (
          <div key={index} className="tache">
            <h2>{tache.nom}</h2>
            <p>{tache.description}</p>
            <p>Priorité : {tache.priorite}</p>
            <p>Statut : {tache.statut}</p>
            <p>
              Date de début :{" "}
              {new Date(tache.dateDebut).toLocaleDateString("fr-FR")}
            </p>
            <p>
              Date de fin prévue :{" "}
              {new Date(tache.dateFinPrevu).toLocaleDateString("fr-FR")}
            </p>
            <p>
              Date de fin réelle :{" "}
              {tache.dateFinReel
                ? new Date(tache.dateFinReel).toLocaleDateString("fr-FR")
                : "Non défini"}
            </p>
            <p>ID du projet : {tache.projetId}</p>
            
            <Link to={`/modifier-tache/${tache.id}`} className="button">Modifier</Link>
          <button onClick={() => deleteTache(tache.id)} className="button">Supprimer</button>
            
            
            
          </div>
        ))
      ) : (
        <p>Pas de tâches pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default TachesProjet;
