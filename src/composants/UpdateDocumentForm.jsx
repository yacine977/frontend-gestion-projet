import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateDocumentForm() {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  // Suppression de useState pour utilisateurId car il sera récupéré depuis le localStorage
  const [projetId, setProjetId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/document/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNom(data.nom);
        setType(data.type);
        setCheminAcces(data.cheminAcces);
        // Utilisation de localStorage pour définir utilisateurId au lieu de le récupérer depuis la réponse
        // setUtilisateurId(data.utilisateurId);
        setProjetId(data.projetId);
      }
    };

    fetchData();
  }, [id]);

  // Récupération de utilisateurId depuis le localStorage
  const utilisateurId = localStorage.getItem('utilisateurId');

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
      utilisateurId: utilisateurId || undefined, // Utilisation de la valeur récupérée depuis le localStorage
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
      // Pas besoin de réinitialiser utilisateurId ici car il est géré globalement via le localStorage
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
          {/* Options du select */}
        </select>
      </label>
      <label>
        Chemin d'accès:
        <input type="text" value={cheminAcces} onChange={(e) => setCheminAcces(e.target.value)} />
      </label>
      {/* Suppression du champ utilisateurId car il est récupéré depuis le localStorage */}
      <label>
        ID du projet:
        <input type="text" value={projetId} onChange={(e) => setProjetId(e.target.value)} />
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateDocumentForm;