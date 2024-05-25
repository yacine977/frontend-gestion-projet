import React, { useState } from 'react';
import '../styles/CreerDocument.css';

function CreerDocument() {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');
  const [projetId, setProjetId] = useState('');

  const valider = () => {
    if (nom.trim() === '') {
      alert('Le nom ne peut pas être vide');
      return false;
    }

    if (type.trim() === '') {
      alert('Veuillez sélectionner un type de document');
      return false;
    }

    if (cheminAcces.trim() === '') {
      alert('Le chemin d\'accès ne peut pas être vide');
      return false;
    }

    if (isNaN(utilisateurId)) {
      alert('L\'ID de l\'utilisateur doit être un nombre');
      return false;
    }

if (isNaN(projetId)) {
      alert('L\'ID du projet doit être un nombre');
      return false;
    }

    return true;
  };

  const soumettre = async (event) => {
    event.preventDefault();

    if (!valider()) {
      return;
    }

    const doc = { nom, type, cheminAcces, utilisateurId, projetId};

    const response = await fetch('http://localhost:3000/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doc),
    });

    if (response.ok) {
        alert('Document créé avec succès');
        setNom('');
        setType('');
        setCheminAcces('');
        setUtilisateurId('');
        setProjetId('');
        
      } else {
        alert('Erreur lors de la création du document');
      }
  };

  return (
    <div className="form-container">
      <form onSubmit={soumettre} className="form">
        <label className="form-label">
          Nom:
          <input type="text" value={nom} onChange={e => setNom(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">
  Type:
  <select value={type} onChange={e => setType(e.target.value)} required className="form-input">
    <option value="">Sélectionnez un type</option>
    <option value=".txt">.txt</option>
    <option value=".pdf">.pdf</option>
    <option value=".doc">.doc</option>
    <option value=".docx">.docx</option>
    <option value=".xls">.xls</option>
    <option value=".xlsx">.xlsx</option>
    <option value=".ppt">.ppt</option>
    <option value=".pptx">.pptx</option>
    <option value=".jpg">.jpg</option>
    <option value=".png">.png</option>
    <option value=".gif">.gif</option>
    <option value=".csv">.csv</option>
    <option value=".xml">.xml</option>
    <option value=".json">.json</option>
  </select>
</label>
        <label className="form-label">
          Chemin d'accès:
          <input type="text" value={cheminAcces} onChange={e => setCheminAcces(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">
          ID de l'utilisateur:
          <input type="text" value={utilisateurId} onChange={e => setUtilisateurId(e.target.value)} required className="form-input" />
        </label>
        <label className="form-label">
          ID du projet:
          <input type="text" value={projetId} onChange={e => setProjetId(e.target.value)} required className="form-input" />
          </label>
        <input type="submit" value="Créer" className="form-submit" />
      </form>
    </div>
  );
}

export default CreerDocument;