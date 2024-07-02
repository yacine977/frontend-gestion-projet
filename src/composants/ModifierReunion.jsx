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
  const [projet, setProjet] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

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

        // Récupération des détails du projet
        const projetResponse = await fetch(`http://localhost:3000/projet/${data.projetId}`);
        const projetData = await projetResponse.json();
        setProjet(projetData);
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

    const reunion = { sujet, dateTime, projetId, createurId };

    try {
      const response = await fetch(`http://localhost:3000/reunion/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reunion),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la réunion");
      }
      alert("Réunion modifiée avec succès");
      setSujet("");
      setDateTime("");
      setProjetId("");
      setCreateurId("");
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  // Fonction utilitaire pour valider la date
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // Rendu du formulaire de modification de la réunion.
  return (
    <form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((message, index) => (
            <p key={index} className="error-message">{message}</p>
          ))}
        </div>
      )}
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
