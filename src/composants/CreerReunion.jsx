import React, { useState } from "react";

function CreerReunion() {
  const [sujet, setSujet] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [projetId, setProjetId] = useState("");
  const [createurId, setCreateurId] = useState("");

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
      setProjetId("");
      setCreateurId("");
    } else {
      alert("Erreur lors de la création de la réunion");
    }
  };

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
