// Importation des hooks et styles nécessaires
import { useState } from "react";
import "../styles/CreerTache.css";
import { useParams } from "react-router-dom";

// Composant pour créer une nouvelle tâche
function CreerTache() {
  // État local pour chaque champ du formulaire
  const [description, setDescription] = useState("");
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFinPrevu, setDateFinPrevu] = useState("");
  const [dateFinReel, setDateFinReel] = useState("");
  // Récupération de l'ID du projet depuis l'URL
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation de la description et du statut
    if (!description.trim() || !statut.trim()) {
      alert("La description et le statut ne peuvent pas être vides");
      return;
    }

    // Validation des dates
    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    const finReel = dateFinReel ? new Date(dateFinReel) : null;

    if (debut > finPrevu) {
      alert(
        "La date de début ne peut pas être supérieure à la date de fin prévue"
      );
      return;
    }

    if (finReel && finReel < debut) {
      alert(
        "La date de fin réelle ne peut pas être inférieure à la date de début"
      );
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
      // Réinitialisation des champs du formulaire
      setDescription("");
      setPriorite(0);
      setStatut("");
      setDateDebut("");
      setDateFinPrevu("");
      setDateFinReel("");
      setProjetId(0);
    } else {
      alert("Erreur lors de la création de la tâche");
    }
  };

  // Rendu du formulaire de création de tâche
  return (
    <form onSubmit={handleSubmit} className="creer-tache">
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
      <label>
        ID du projet:
        <input
          type="number"
          value={projetId}
          onChange={(e) => setProjetId(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="submit-button">
        Créer une tâche
      </button>
    </form>
  );
}

export default CreerTache;
