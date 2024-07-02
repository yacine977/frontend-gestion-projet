import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjetForm.css";

// Fonction utilitaire pour formater la date en yyyy-mm-dd
const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return [year, month, day].join("-");
};

// Composant pour modifier les détails d'un projet existant
function ModifierProjet() {
  // Récupération de l'ID du projet depuis l'URL
  const { id } = useParams();
  // États pour stocker les informations du projet
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFinPrevu, setDateFinPrevu] = useState("");
  const [dateFinReel, setDateFinReel] = useState("");
  const navigate = useNavigate();

  // Charger les détails du projet au montage du composant
  useEffect(() => {
    const fetchProjet = async () => {
      const response = await fetch(`http://localhost:3000/projet/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      const projet = data[0]; // Accès au premier élément du tableau

      // Utiliser la fonction formatDate pour formater les dates
      const dateDebut = formatDate(projet.dateDebut);
      const dateFinPrevu = formatDate(projet.dateFinPrevu);
      const dateFinReel = projet.dateFinReel ? formatDate(projet.dateFinReel) : "";

      // Mise à jour des états avec les données du projet
      setNom(projet.nom);
      setDescription(projet.description);
      setDateDebut(dateDebut);
      setDateFinPrevu(dateFinPrevu);
      setDateFinReel(dateFinReel);
    };

    fetchProjet();
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nom.trim() === "" || description.trim() === "") {
      alert("Le nom et la description ne peuvent pas être vides");
      return;
    }

    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    let finReel = dateFinReel ? new Date(dateFinReel) : null; // Permettre null

    if (debut > finPrevu) {
      alert("La date de début ne peut pas être supérieure à la date de fin prévue");
      return;
    }

    if (finReel && finReel < debut) {
      alert("La date de fin réelle ne peut pas être inférieure à la date de début");
      return;
    }

    // Préparation de l'objet projet pour l'envoi
    const projet = {
      nom,
      description,
      dateDebut,
      dateFinPrevu,
      dateFinReel: dateFinReel || null, // Envoyer null si vide
    };

    const response = await fetch(`http://localhost:3000/projet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(projet),
    });

    if (response.ok) {
      alert("Projet modifié avec succès");
      navigate("/projets");
    } else {
      alert("Erreur lors de la modification du projet");
    }
  };

  // Formulaire de modification du projet
  return (
    <form onSubmit={handleSubmit} className="creer-projet">
      <label>
        Nom:
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Date de début:
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />
      </label>
      <label>
        Date de fin prévue:
        <input
          type="date"
          value={dateFinPrevu}
          onChange={(e) => setDateFinPrevu(e.target.value)}
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

      <button type="submit">Modifier le projet</button>
    </form>
  );
}

export default ModifierProjet;
