import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/**
 * Composant pour modifier une réunion existante.
 * Utilise l'ID de la réunion récupéré depuis l'URL pour charger et modifier les données de la réunion.
 */
function ModifierReunion() {
  const { id } = useParams(); // Récupération de l'ID de la réunion depuis l'URL.

  // États locaux pour stocker les informations de la réunion.
  const [sujet, setSujet] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [projetId, setProjetId] = useState("");
  const [createurId, setCreateurId] = useState("");

  // Chargement des données de la réunion à partir de l'API au montage du composant.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reunion/${id}`);
        if (!response.ok)
          throw new Error(
            "Erreur lors du chargement des données de la réunion"
          );
        const data = await response.json();
        setSujet(data.sujet);
        setDateTime(formatDateTime(data.dateTime));
        setProjetId(data.projetId);
        setCreateurId(data.createurId);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  /**
   * Formate une chaîne de date et heure au format local.
   * @param {string} dateTimeString - La chaîne de date et heure à formater.
   * @returns {string} La date et l'heure formatées.
   */
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Gère la soumission du formulaire pour modifier la réunion.
   * @param {Event} event - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reunion = { sujet, dateTime, projetId, createurId };

    try {
      const response = await fetch(`http://localhost:3000/reunion/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reunion),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la modification de la réunion");
      alert("Réunion modifiée avec succès");
      setSujet("");
      setDateTime("");
      setProjetId("");
      setCreateurId("");
    } catch (error) {
      alert(error.message);
    }
  };

  // Rendu du formulaire de modification de la réunion.
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
          type="text"
          value={projetId}
          onChange={(e) => setProjetId(e.target.value)}
        />
      </label>
      <label>
        ID du créateur:
        <input
          type="text"
          value={createurId}
          onChange={(e) => setCreateurId(e.target.value)}
        />
      </label>
      <button type="submit">Modifier la réunion</button>
    </form>
  );
}

export default ModifierReunion;
