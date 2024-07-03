// Importation des hooks et styles nécessaires
import { useState, useEffect } from "react";
import "../styles/CreerTache.css";
import { useParams, useNavigate } from "react-router-dom";

// Composant pour créer une nouvelle tâche
function CreerTache() {
  // État local pour chaque champ du formulaire
  const [description, setDescription] = useState("");
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFinPrevu, setDateFinPrevu] = useState("");
  const [dateFinReel, setDateFinReel] = useState("");
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);
  const navigate = useNavigate();
  const [projet, setProjet] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  // Récupération des détails du projet
  useEffect(() => {
    const fetchProjet = async () => {
      const response = await fetch(`http://localhost:3000/projet/${projetId}`);
      const data = await response.json();
      setProjet(data);
    };

    fetchProjet();
  }, [projetId]);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Réinitialiser les messages d'erreur
    setErrorMessages([]);

    const newErrorMessages = [];

    // Validation de la description et du statut
    if (!description.trim() || !statut.trim()) {
      newErrorMessages.push("La description et le statut ne peuvent pas être vides");
    }

    // Validation des dates
    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    const finReel = dateFinReel ? new Date(dateFinReel) : null;

    if (debut > finPrevu) {
      newErrorMessages.push("La date de début ne peut pas être supérieure à la date de fin prévue");
    }

    if (finReel && finReel < debut) {
      newErrorMessages.push("La date de fin réelle ne peut pas être inférieure à la date de début");
    }

    if (projet) {
      const projetDebut = new Date(projet.dateDebut);
      const projetFinPrevu = new Date(projet.dateFinPrevu);

      if (debut < projetDebut || debut > projetFinPrevu) {
        newErrorMessages.push("La date de début de la tâche doit être comprise entre les dates du projet");
      }

      if (finPrevu < projetDebut || finPrevu > projetFinPrevu) {
        newErrorMessages.push("La date de fin prévue de la tâche doit être comprise entre les dates du projet");
      }

      if (finReel && (finReel < projetDebut || finReel > projetFinPrevu)) {
        newErrorMessages.push("La date de fin réelle de la tâche doit être comprise entre les dates du projet");
      }
    }

    // Si des erreurs sont trouvées, les afficher et ne pas soumettre le formulaire
    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    // Préparation de l'objet tâche pour l'envoi
    const tache = {
      description,
      priorite,
      statut,
      dateDebut,
      dateFinPrevu,
      dateFinReel,
      projetId,
    };

    // Envoi de la tâche au serveur
    const response = await fetch("http://localhost:3000/tache", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tache),
    });

    // Gestion de la réponse du serveur
    if (response.ok) {
      alert("Tâche créée avec succès");
      navigate(`/taches-projet/${projetId}`);
      setDescription("");
      setPriorite(0);
      setStatut("");
      setDateDebut("");
      setDateFinPrevu("");
      setDateFinReel("");
      setProjetId(0);
    } else {
      const errorData = await response.json();
      setErrorMessages([errorData.error || "Erreur lors de la création de la tâche"]);
    }
  };

  // Rendu du formulaire de création de tâche
  return (
    <form onSubmit={handleSubmit} className="creer-tache">
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((message, index) => (
            <p key={index} className="error-message">{message}</p>
          ))}
        </div>
      )}
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Priorité:
        <input
          type="number"
          value={priorite}
          onChange={(e) => setPriorite(e.target.value)}
          required
        />
      </label>
      <label>
        Statut:
        <input
          type="text"
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          required
        />
      </label>
      <label>
        Date de début:
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />
      </label>
      <label>
        Date de fin prévue:
        <input
          type="date"
          value={dateFinPrevu}
          onChange={(e) => setDateFinPrevu(e.target.value)}
          required
        />
      </label>
      <label>
        Date de fin réelle:
        <input
          type="date"
          value={dateFinReel}
          onChange={(e) => setDateFinReel(e.target.value)}
        />
      </label>
      {/* <label>
  ID du projet:
  <input
    type="number"
    value={projetId}
    onChange={(e) => setProjetId(e.target.value)}
    required
  />
</label> */}
      <button type="submit" className="submit-button">
        Créer une tâche
      </button>
    </form>
  );
}

export default CreerTache;
