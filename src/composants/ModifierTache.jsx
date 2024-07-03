import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CreerTache.css";

// Fonction utilitaire pour formater la date en yyyy-mm-dd
const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return [year, month, day].join("-");
};

function ModifierTache() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFinPrevu, setDateFinPrevu] = useState("");
  const [dateFinReel, setDateFinReel] = useState("");
  const [projetId, setProjetId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [projet, setProjet] = useState(null);

  useEffect(() => {
    const fetchTache = async () => {
      const response = await fetch(`http://localhost:3000/tache/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement de la tâche");
      }
      const data = await response.json();
      const tache = data;

      const dateDebut = formatDate(tache.dateDebut);
      const dateFinPrevu = formatDate(tache.dateFinPrevu);
      const dateFinReel = tache.dateFinReel ? formatDate(tache.dateFinReel) : "";

      setDescription(tache.description || "");
      setPriorite(tache.priorite || 0);
      setStatut(tache.statut || "");
      setDateDebut(dateDebut || "");
      setDateFinPrevu(dateFinPrevu || "");
      setDateFinReel(dateFinReel || "");
      setProjetId(tache.projetId || 0);
    };

    fetchTache();
  }, [id]);

  useEffect(() => {
    const fetchProjet = async () => {
      const response = await fetch(`http://localhost:3000/projet/${projetId}`);
      const data = await response.json();
      setProjet(data);
    };

    if (projetId) {
      fetchProjet();
    }
  }, [projetId]);

  const validateForm = () => {
    let formErrors = {};
    if (!description) formErrors.description = "La description est requise";
    if (!priorite) formErrors.priorite = "La priorité est requise";
    if (!statut) formErrors.statut = "Le statut est requis";
    if (!dateDebut) formErrors.dateDebut = "La date de début est requise";
    if (!dateFinPrevu) formErrors.dateFinPrevu = "La date de fin prévue est requise";
    if (!projetId) formErrors.projetId = "L'ID du projet est requis";

    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    const finReel = dateFinReel ? new Date(dateFinReel) : null;

    if (projet) {
      const projetDebut = new Date(projet.dateDebut);
      const projetFinPrevu = new Date(projet.dateFinPrevu);

      if (debut < projetDebut || debut > projetFinPrevu) {
        formErrors.dateDebut = `La date de début de la tâche (${dateDebut}) doit être comprise entre les dates du projet (${formatDate(projet.dateDebut)} et ${formatDate(projet.dateFinPrevu)})`;
      }

      if (finPrevu < projetDebut || finPrevu > projetFinPrevu) {
        formErrors.dateFinPrevu = `La date de fin prévue de la tâche (${dateFinPrevu}) doit être comprise entre les dates du projet (${formatDate(projet.dateDebut)} et ${formatDate(projet.dateFinPrevu)})`;
      }

      if (finReel && (finReel < projetDebut || finReel > projetFinPrevu)) {
        formErrors.dateFinReel = `La date de fin réelle de la tâche (${dateFinReel}) doit être comprise entre les dates du projet (${formatDate(projet.dateDebut)} et ${formatDate(projet.dateFinPrevu)})`;
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const tache = {
      description,
      priorite,
      statut,
      dateDebut,
      dateFinPrevu,
      dateFinReel,
      projetId,
    };

    try {
      const response = await fetch(`http://localhost:3000/tache/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tache),
      });

      if (response.ok) {
        alert("Tâche modifiée avec succès");
        navigate(`/taches-projet/${projetId}`);
      } else {
        const errorText = await response.text();
        alert(`Erreur lors de la modification de la tâche : ${errorText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error);
      alert(`Erreur lors de la modification de la tâche : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="creer-tache">
      {Object.keys(errors).length > 0 && (
        <div className="error-messages">
          {Object.entries(errors).map(([key, message]) => (
            <p key={key} className="error-message">{message}</p>
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
      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Modification en cours..." : "Modifier la tâche"}
      </button>
    </form>
  );
}

export default ModifierTache;
