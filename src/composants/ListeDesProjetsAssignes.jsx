import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ListeDesProjets.css";

function ListeDesProjetsAssignes() {
  const [projets, setProjets] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const uid = user?.uid;

  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:3000/projet/utilisateur/${uid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setProjets(data))
        .catch((error) => {
          console.error("Une erreur est survenue lors de la récupération des projets : ", error);
        });
    }
  }, [uid]);

  const supprimerProjet = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      return;
    }
    const response = await fetch(`http://localhost:3000/projet/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Projet supprimé avec succès");
      setProjets(projets.filter((projet) => projet.id !== id));
    } else {
      alert("Erreur lors de la suppression du projet");
    }
  };

  const validerProjet = async (id) => {
    const response = await fetch(`http://localhost:3000/projet/${id}/valider`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Projet validé avec succès");
      setProjets(
        projets.map((projet) =>
          projet.id === id ? { ...projet, est_valide: true } : projet
        )
      );
    } else {
      alert("Erreur lors de la validation du projet");
    }
  };

  return (
    <div className="liste-projets">
    <h1>Liste des projets</h1>
    {projets.length > 0 ? (
      projets.map((projet) => (
        <div key={projet.id} className="projet">
          <div className="actions">
            {role === "PDG" && (
              <>
                <Link to={`/modifier-projet/${projet.id}`} className="modifier">
                  Modifier
                </Link>
                <button onClick={() => supprimerProjet(projet.id)}>
                  Supprimer
                </button>
                {!projet.est_valide && (
                  <button onClick={() => validerProjet(projet.id)}>Valider</button>
                )}
              </>
            )}
            <Link to={`/detail-projet/${projet.id}`} className="detail">
              Consulter
            </Link>
          </div>
          <h2>{projet.nom}</h2>
          <p>{projet.description}</p>

          <p>
            Date de début : {new Date(projet.dateDebut).toLocaleDateString()}
          </p>
          <p>
            Date de fin prévue :{" "}
            {new Date(projet.dateFinPrevu).toLocaleDateString()}
          </p>
          <p>
            Date de fin réelle :{" "}
            {projet.dateFinReel
              ? new Date(projet.dateFinReel).toLocaleDateString()
              : "Non défini"}
          </p>
         
          <p>Est validé : {projet.est_valide ? "Oui" : "Non"}</p>
        </div>
      ))
    ) : (
      <p>Vous n'êtes assigné à aucun projet.</p>
    )}
  </div>
  );
}

export default ListeDesProjetsAssignes;
