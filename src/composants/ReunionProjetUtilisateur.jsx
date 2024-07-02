import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ReunionProjetUtilisateur.css";

function ReunionProjetUtilisateur() {
  const [reunions, setReunions] = useState([]);
  const [participants, setParticipants] = useState({});
  const [participantsVisibles, setParticipantsVisibles] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const { projetId } = useParams();
  const createurId = localStorage.getItem("uid");

  useEffect(() => {
    fetch(`http://localhost:3000/reunion/par-projet/${projetId}/${createurId}`)
      .then((response) => response.json())
      .then((data) => {
        setReunions(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, [projetId, createurId]);

  useEffect(() => {
    fetch(`http://localhost:3000/projet/${projetId}/utilisateurs`)
      .then((response) => response.json())
      .then((data) => {
        setUtilisateurs(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, [projetId]);

  const toggleParticipants = (reunionId) => {
    if (participantsVisibles.includes(reunionId)) {
      setParticipantsVisibles((prev) =>
        prev.filter((id) => id !== reunionId)
      );
    } else {
      fetch(`http://localhost:3000/reunion/participation/${reunionId}`)
        .then((response) => response.json())
        .then((data) => {
          setParticipants((prev) => ({ ...prev, [reunionId]: data }));
          setParticipantsVisibles((prev) => [...prev, reunionId]);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des participants:",
            error
          )
        );
    }
  };

  const ajouterParticipant = (reunionId, utilisateurId) => {
    if (!utilisateurId) return;

    fetch("http://localhost:3000/reunion/ajouter-utilisateur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reunionId, utilisateurId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Participant ajouté avec succès!");
        fetch(`http://localhost:3000/reunion/participation/${reunionId}`)
          .then((response) => response.json())
          .then((data) => {
            setParticipants((prev) => ({ ...prev, [reunionId]: data }));
          })
          .catch((error) =>
            console.error(
              "Erreur lors de la récupération des participants:",
              error
            )
          );
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du participant:", error);
        alert("Erreur lors de l'ajout du participant");
      });
  };

  const supprimerParticipant = (reunionId, utilisateurId) => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${utilisateurId} de la réunion?`
      )
    )
      return;

    fetch(
      `http://localhost:3000/reunion/supprimer-utilisateur/${reunionId}/${utilisateurId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Participant supprimé avec succès!");
        fetch(`http://localhost:3000/reunion/participation/${reunionId}`)
          .then((response) => response.json())
          .then((data) => {
            setParticipants((prev) => ({ ...prev, [reunionId]: data }));
          })
          .catch((error) =>
            console.error(
              "Erreur lors de la récupération des participants:",
              error
            )
          );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du participant:", error);
        alert("Erreur lors de la suppression du participant");
      });
  };

  return (
    <div className="reunion-container">
      <h2>Mes réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id} className="reunion">
            <h3>{reunion.sujet}</h3>
            <p>
              Date et heure :{" "}
              {new Date(reunion.dateTime).toLocaleString("fr-FR")}
            </p>
            <button onClick={() => toggleParticipants(reunion.id)}>
              {participantsVisibles.includes(reunion.id)
                ? "Cacher les participants"
                : "Voir les participants"}
            </button>

            {participantsVisibles.includes(reunion.id) && (
              <div className="select-user">
                <h4>Ajouter un participant :</h4>
                <select
                  onChange={(e) => ajouterParticipant(reunion.id, e.target.value)}
                >
                  <option value="">Sélectionner un utilisateur</option>
                  {utilisateurs.map((utilisateur) => (
                    <option
                      key={utilisateur.utilisateurId}
                      value={utilisateur.utilisateurId}
                    >
                      {utilisateur.nom} {utilisateur.prenom}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {participantsVisibles.includes(reunion.id) &&
              participants[reunion.id] && (
                <ul className="participant-list">
                  {participants[reunion.id].map((participant) => (
                    <li key={participant.utilisateurId}>
                      {participant.nom} {participant.prenom}
                      <button
                        onClick={() =>
                          supprimerParticipant(
                            reunion.id,
                            participant.utilisateurId
                          )
                        }
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))
      ) : (
        <p>Pas de réunions pour ce projet pour le moment...</p>
      )}
    </div>
  );
}

export default ReunionProjetUtilisateur;
