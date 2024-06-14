import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Composant pour créer une nouvelle réunion
function CreerReunion() {
  // États pour gérer les champs du formulaire
  const [sujet, setSujet] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [createurId, setCreateurId] = useState("");
  // Récupération de l'ID du projet depuis l'URL
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Envoi des données du formulaire au serveur
    const response = await fetch("http://localhost:3000/reunion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sujet, dateTime, projetId, createurId }),
    });

    // Réinitialisation des champs du formulaire en cas de succès
    if (response.ok) {
      alert("Réunion créée avec succès");
      setSujet("");
      setDateTime("");
      setProjetId(initialProjetId || 0); // Réinitialisation avec l'ID du projet initial ou 0
      setCreateurId("");
    } else {
      alert("Erreur lors de la création de la réunion");
    }
  };

  // Rendu du formulaire de création de réunion
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sujet:
        <input
          type="text"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
        />
      </label>
      <label>
        Date et heure:
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </label>
      <label>
        ID du projet:
        <input
          type="number"
          value={projetId}
          onChange={(e) => setProjetId(e.target.value)}
        />
      </label>
      <label>
        ID du créateur:
        <input
          type="number"
          value={createurId}
          onChange={(e) => setCreateurId(e.target.value)}
        />
      </label>
      <button type="submit">Créer une réunion</button>
    </form>
  );
}

export default CreerReunion;
