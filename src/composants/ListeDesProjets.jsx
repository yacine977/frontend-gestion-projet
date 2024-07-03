import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ListeDesProjets.css";

function ListeDesProjets() {
  const [projets, setProjets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetch("http://localhost:3000/projet")
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
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const searchBarStyles = {
    marginBottom: '20px',
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
  };

  return (
    <div className="liste-projets">
      <h1>Liste des projets</h1>
      <input
        type="text"
        placeholder="Rechercher par nom de projet..."
        value={searchTerm}
        onChange={handleSearch}
        style={searchBarStyles}
      />
      {projets
        .filter((projet) =>
          projet.nom.toLowerCase().includes(searchTerm)
        )
        .map((projet) => (
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
            <p>Date de début : {new Date(projet.dateDebut).toLocaleDateString()}</p>
            <p>Date de fin prévue : {new Date(projet.dateFinPrevu).toLocaleDateString()}</p>
            <p>Date de fin réelle : {projet.dateFinReel ? new Date(projet.dateFinReel).toLocaleDateString() : "Non défini"}</p>
            <p>Est validé : {projet.est_valide ? "Oui" : "Non"}</p>
          </div>
        ))}
    </div>
  );
}

export default ListeDesProjets;
