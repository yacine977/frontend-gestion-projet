import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/CreerReunion.css"; // Importez votre fichier CSS ici

function CreerReunion() {
  const [sujet, setSujet] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [createurId, setCreateurId] = useState("");
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);

  useEffect(() => {
    // Récupération de l'ID du créateur depuis le localStorage
    const uid = localStorage.getItem("uid");
    if (uid) {
      setCreateurId(uid);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/reunion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sujet, dateTime, projetId, createurId }),
    });

    if (response.ok) {
      alert("Réunion créée avec succès");
      setSujet("");
      setDateTime("");
      setProjetId(initialProjetId || 0);
    } else {
      alert("Erreur lors de la création de la réunion");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-reunion">
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
      <label className="label">
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
      </label>
      <button type="submit" className="button-submit">Créer une réunion</button>
    </form>
  );
}

export default CreerReunion;