// Importation des hooks et des styles nécessaires
import { useState } from "react";
import "../styles/ProjetForm.css";
import { useNavigate } from "react-router-dom";

// Composant pour créer un nouveau projet
function CreerProjet() {
  // Déclaration des états pour chaque champ du formulaire
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFinPrevu, setDateFinPrevu] = useState("");
  const [dateFinReel, setDateFinReel] = useState("");
  const navigate = useNavigate(); 

 // Gestionnaire de soumission du formulaire
const handleSubmit = async (event) => {
  event.preventDefault();

  // Validation : le nom et la description ne doivent pas être vides
  if (!nom.trim() || !description.trim()) {
    alert("Le nom et la description ne peuvent pas être vides");
    return;
  }

  // Conversion des chaînes de date en objets Date pour comparaison
  const debut = new Date(dateDebut);
  const finPrevu = new Date(dateFinPrevu);
  const finReel = dateFinReel ? new Date(dateFinReel) : null; // Convertir seulement si dateFinReel n'est pas vide

  // Validation : la date de début doit être aujourd'hui ou dans le futur
  const aujourdhui = new Date();
  if (debut < aujourdhui) {
    alert("La date de début ne peut pas être dans le passé");
    return;
  }

  // Validation : la date de début doit être antérieure à la date de fin prévue
  if (debut > finPrevu) {
    alert(
      "La date de début ne peut pas être supérieure à la date de fin prévue"
    );
    return;
  }

  // Validation : la date de fin réelle doit être postérieure à la date de début
  if (finReel && finReel < debut) {
    alert(
      "La date de fin réelle ne peut pas être inférieure à la date de début"
    );
    return;
  }

  // Préparation de l'objet projet à envoyer
  const projet = { nom, description, dateDebut, dateFinPrevu, dateFinReel };

  // Envoi du projet au serveur
  const response = await fetch("http://localhost:3000/projet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(projet),
  });

  // Gestion de la réponse du serveur
  if (response.ok) {
    alert("Projet créé avec succès");
    navigate('/projets'); 
    // Réinitialisation des champs du formulaire
    setNom("");
    setDescription("");
    setDateDebut("");
    setDateFinPrevu("");
    setDateFinReel("");
  } else {
    alert("Erreur lors de la création du projet");
  }
};


  // Rendu du formulaire de création de projet
  return (
    <form onSubmit={handleSubmit} className="creer-projet">
      <h2>Créer un nouveau projet</h2>
      <div className="input-group">
        <label>Nom:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Date de début:</label>
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Date de fin prévue:</label>
        <input
          type="date"
          value={dateFinPrevu}
          onChange={(e) => setDateFinPrevu(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Date de fin réelle:</label>
        <input
          type="date"
          value={dateFinReel}
          onChange={(e) => setDateFinReel(e.target.value)}
        />
      </div>

      <button type="submit">Créer le projet</button>
    </form>
  );
}

export default CreerProjet;
