import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateDocumentForm() {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');
  const [projetId, setProjetId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/document/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNom(data.nom);
        setType(data.type);
        setCheminAcces(data.cheminAcces);
        setUtilisateurId(data.utilisateurId);
        setProjetId(data.projetId);
      }
    };

    fetchData();
  }, [id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!valider()) {
      return;
    }

    const data = {
      nom: nom || undefined,
      type: type || undefined,
      cheminAcces: cheminAcces || undefined,
      utilisateurId: utilisateurId || undefined,
      projetId: projetId || undefined,
    };

    const response = await fetch(`http://localhost:3000/document/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      setNom('');
      setType('');
      setCheminAcces('');
      setUtilisateurId('');
      setProjetId('');
      alert('Document mis à jour avec succès');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
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
      <label>
        Chemin d'accès:
        <input type="text" value={cheminAcces} onChange={(e) => setCheminAcces(e.target.value)} />
      </label>
      <label>
        ID de l'utilisateur:
        <input type="text" value={utilisateurId} onChange={(e) => setUtilisateurId(e.target.value)} />
      </label>
      <label>
        ID du projet:
        <input type="text" value={projetId} onChange={(e) => setProjetId(e.target.value)} />
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateDocumentForm;