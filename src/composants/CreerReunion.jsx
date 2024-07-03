import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CreerReunion.css";

function CreerReunion() {
  const [sujet, setSujet] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [createurId, setCreateurId] = useState("");
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);
  const [projet, setProjet] = useState(null);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  // Récupération des détails du projet
  useEffect(() => {
     // Récupération de l'ID du créateur depuis le localStorage
  const uid = localStorage.getItem("uid"); // Assurez-vous que "uid" est la clé correcte
  if (uid) {
    setCreateurId(uid);
  }
    const fetchProjet = async () => {
      const response = await fetch(`http://localhost:3000/projet/${projetId}`);
      const data = await response.json();
      setProjet(data);
    };

    

    fetchProjet();
  }, [projetId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Réinitialiser les messages d'erreur
    setErrorMessages([]);

    const newErrorMessages = [];

    // Validation du sujet
    if (!sujet.trim()) {
      newErrorMessages.push("Le sujet ne peut pas être vide");
    }

    // Validation des dates
    const reunionDateTime = new Date(dateTime);

    if (!isValidDate(reunionDateTime)) {
      newErrorMessages.push("La date et l'heure de la réunion ne sont pas valides");
    }

    if (projet) {
      const projetDebut = new Date(projet.dateDebut);
      const projetFinPrevu = new Date(projet.dateFinPrevu);

      if (reunionDateTime < projetDebut || reunionDateTime > projetFinPrevu) {
        newErrorMessages.push("La date et l'heure de la réunion doivent être comprises entre les dates du projet");
      }
    }

    // Si des erreurs sont trouvées, les afficher et ne pas soumettre le formulaire
    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    // Préparation de l'objet réunion pour l'envoi
    const reunion = {
      sujet,
      dateTime,
      projetId,
      createurId,
    };

    // Envoi de la réunion au serveur
    const response = await fetch("http://localhost:3000/reunion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reunion),
    });

    // Gestion de la réponse du serveur
    if (response.ok) {
      alert("Réunion créée avec succès");
      navigate(`/reunion-projet-utilisateur/${projetId}`);
      setSujet("");
      setDateTime("");
      setProjetId(initialProjetId || 0);
    } else {
      const errorData = await response.json();
      setErrorMessages([errorData.error || "Erreur lors de la création de la réunion"]);
    }
  };

  // Fonction utilitaire pour valider la date
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  return (
    <form onSubmit={handleSubmit} className="form-reunion">
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((message, index) => (
            <p key={index} className="error-message">{message}</p>
          ))}
        </div>
      )}
      <label className="label">
        Sujet:
        <input
          type="text"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
          className="input"
        />
      </label>
      <label className="label">
        Date et heure:
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="input"
        />
      </label>
      {/* <label className="label">
        ID du projet:
        <input
          type="number"
          value={projetId}
          onChange={(e) => setProjetId(e.target.value)}
          className="input"
        />
      </label>
      <label className="label">
        ID du créateur:
        <input
          type="text"
          value={createurId}
          onChange={(e) => setCreateurId(e.target.value)}
          readOnly // Ce champ est en lecture seule car la valeur est pré-remplie
          className="input"
        />
      </label> */}
      <button type="submit" className="button-submit">Créer une réunion</button>
    </form>
  );
}

export default CreerReunion;
