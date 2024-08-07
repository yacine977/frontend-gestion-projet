import React, { useState, useEffect } from "react";
import "../styles/CreerDocument.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreerDocument() {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [cheminAcces, setCheminAcces] = useState("");
  const [utilisateurId, setUtilisateurId] = useState("");
  const { projetId: initialProjetId } = useParams();
  const [projetId, setProjetId] = useState(initialProjetId || 0);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupération de l'ID de l'utilisateur depuis le localStorage et mise à jour de l'état
    const uid = localStorage.getItem("uid");
    setUtilisateurId(uid);
  }, []);

  const valider = () => {
    if (nom.trim() === "") {
      alert("Le nom ne peut pas être vide");
      return false;
    }
    if (type.trim() === "") {
      alert("Veuillez sélectionner un type de document");
      return false;
    }
    if (cheminAcces.trim() === "") {
      alert("Le chemin d'accès ne peut pas être vide");
      return false;
    }
   
    if (isNaN(projetId) || projetId <= 0) {
      alert("L'ID du projet doit être un nombre supérieur à 0");
      return false;
    }
    return true;
  };

  const soumettre = async (event) => {
    event.preventDefault();
    if (!valider()) {
      return;
    }
    const doc = { nom, type, cheminAcces, utilisateurId, projetId };
    const response = await fetch("http://localhost:3000/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });
    if (response.ok) {
      alert("Document créé avec succès");
      navigate(`/documents-projet/${projetId}`);
      setNom("");
      setType("");
      setCheminAcces("");
      setUtilisateurId("");
      setProjetId("");
    } else {
      alert("Erreur lors de la création du document");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={soumettre} className="form">
        <label className="form-label">
          Nom:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required className="form-input">
            <option value="">Sélectionnez un type</option>
            <option value=".txt">.txt</option>
            <option value=".pdf">.pdf</option>
          </select>
        </label>
        <label className="form-label">
          Chemin d'accès:
          <input type="text" value={cheminAcces} onChange={(e) => setCheminAcces(e.target.value)} required className="form-input" />
        </label>
        {/* <label className="form-label">
          ID de l'utilisateur:
          <input type="text" value={utilisateurId} onChange={(e) => setUtilisateurId(e.target.value)} required className="form-input" />
        </label>
         
         <label className="form-label">
          ID du projet:
          <input type="text" value={projetId} onChange={(e) => setProjetId(e.target.value)} required className="form-input" />
        </label>*/}
        <input type="submit" value="Créer" className="form-submit" />
      </form>
    </div>
  );
}

export default CreerDocument;