import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReunionProjetUtilisateur() {
  const [reunions, setReunions] = useState([]);
  const [participants, setParticipants] = useState({});
  const [participantsVisibles, setParticipantsVisibles] = useState([]); // Nouvel état pour suivre les réunions visibles
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

  const toggleParticipants = (reunionId) => {
    fetch(`http://localhost:3000/reunion/participation/${reunionId}`)
      .then((response) => response.json())
      .then((data) => {
        setParticipants((prev) => ({ ...prev, [reunionId]: data }));
        setParticipantsVisibles((prev) =>
          prev.includes(reunionId)
            ? prev.filter((id) => id !== reunionId)
            : [...prev, reunionId]
        );
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des participants:", error)
      );
  };

  const ajouterParticipant = (reunionId) => {
    const utilisateurId = prompt("Entrez l'ID de l'utilisateur à ajouter :");
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
        toggleParticipants(reunionId); // Rafraîchir la liste des participants après l'ajout
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
        toggleParticipants(reunionId); // Rafraîchir la liste des participants après la suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du participant:", error);
        alert("Erreur lors de la suppression du participant");
      });
  };

  

  return (
    <div>
      <h2>Mes réunions pour ce projet :</h2>
      {reunions.length > 0 ? (
        reunions.map((reunion) => (
          <div key={reunion.id}>
            <h3>{reunion.sujet}</h3>
            <p>
              Date et heure :{" "}
              {new Date(reunion.dateTime).toLocaleString("fr-FR")}
            </p>
            <button
  onClick={() => ajouterParticipant(reunion.id)}
  style={{ marginRight: "10px" }} // Ajoutez cette ligne pour ajouter de l'espace
>
  Ajouter un participant
</button>
<button onClick={() => toggleParticipants(reunion.id)}>
  {participantsVisibles.includes(reunion.id)
    ? "Cacher les participants"
    : "Voir les participants"}
</button>
            {participantsVisibles.includes(reunion.id) &&
              participants[reunion.id] && (
                <ul>
                  {participants[reunion.id].map((participant) => (
                    <li key={participant.utilisateurId}>
                      {participant.utilisateurId}
                    </li>
                  ))}
                </ul>
              )}
            {participantsVisibles.includes(reunion.id) &&
              participants[reunion.id] && (
                <ul>
                  {participants[reunion.id].map((participant) => (
                    <li key={participant.utilisateurId}>
                      {participant.utilisateurId}
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
