// Importation des dépendances nécessaires
import React, { useState } from "react";
import "../styles/CreerDocument.css"; // Importation du style
import { useParams } from "react-router-dom"; // Pour récupérer les paramètres de l'URL

// Composant pour créer un document
function CreerDocument() {
  // Déclaration des états locaux
  const [nom, setNom] = useState(""); // Pour le nom du document
  const [type, setType] = useState(""); // Pour le type du document
  const [cheminAcces, setCheminAcces] = useState(""); // Pour le chemin d'accès du document
  const [utilisateurId, setUtilisateurId] = useState(""); // Pour l'ID de l'utilisateur
  const { projetId: initialProjetId } = useParams(); // Récupération de l'ID du projet depuis l'URL
  const [projetId, setProjetId] = useState(initialProjetId || 0); // Pour l'ID du projet, avec une valeur par défaut si non spécifié

  // Fonction pour valider les données saisies par l'utilisateur
  const valider = () => {
    // Validation du nom
    if (nom.trim() === "") {
      alert("Le nom ne peut pas être vide");
      return false;
    }

    // Validation du type
    if (type.trim() === "") {
      alert("Veuillez sélectionner un type de document");
      return false;
    }

    // Validation du chemin d'accès
    if (cheminAcces.trim() === "") {
      alert("Le chemin d'accès ne peut pas être vide");
      return false;
    }

    // Validation de l'ID de l'utilisateur
    if (isNaN(utilisateurId) || utilisateurId <= 0) {
      alert("L'ID de l'utilisateur doit être un nombre supérieur à 0");
      return false;
    }

    // Validation de l'ID du projet
    if (isNaN(projetId) || projetId <= 0) {
      alert("L'ID du projet doit être un nombre supérieur à 0");
      return false;
    }

    return true; // Retourne vrai si toutes les validations sont passées
  };

  // Fonction pour soumettre le formulaire
  const soumettre = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    if (!valider()) {
      // Si la validation échoue, arrête l'exécution
      return;
    }

    // Création de l'objet document
    const doc = { nom, type, cheminAcces, utilisateurId, projetId };

    // Envoi du document au serveur
    const response = await fetch("http://localhost:3000/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });

    // Traitement de la réponse du serveur
    if (response.ok) {
      alert("Document créé avec succès");
      // Réinitialisation des champs du formulaire
      setNom("");
      setType("");
      setCheminAcces("");
      setUtilisateurId("");
      setProjetId("");
    } else {
      alert("Erreur lors de la création du document");
    }
  };

  // Rendu du composant
  return (
    <div className="form-container">
      <form onSubmit={soumettre} className="form">
        {/* Champ pour le nom du document */}
        <label className="form-label">
          Nom:
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="form-input"
          />
        </label>
        {/* Sélecteur pour le type du document */}
        <label className="form-label">
          Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Sélectionnez un type</option>
            {/* Options de type de document */}
            <option value=".txt">.txt</option>
            <option value=".pdf">.pdf</option>
            {/* Autres options... */}
          </select>
        </label>
        {/* Champ pour le chemin d'accès */}
        <label className="form-label">
          Chemin d'accès:
          <input
            type="text"
            value={cheminAcces}
            onChange={(e) => setCheminAcces(e.target.value)}
            required
            className="form-input"
          />
        </label>
        {/* Champ pour l'ID de l'utilisateur */}
        <label className="form-label">
          ID de l'utilisateur:
          <input
            type="text"
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(e.target.value)}
            required
            className="form-input"
          />
        </label>
        {/* Champ pour l'ID du projet */}
        <label className="form-label">
          ID du projet:
          <input
            type="text"
            value={projetId}
            onChange={(e) => setProjetId(e.target.value)}
            required
            className="form-input"
          />
        </label>
        {/* Bouton de soumission */}
        <input type="submit" value="Créer" className="form-submit" />
      </form>
    </div>
  );
}

export default CreerDocument; // Exportation du composant
