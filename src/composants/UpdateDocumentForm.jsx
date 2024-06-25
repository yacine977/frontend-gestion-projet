import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateDocumentForm() {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  const [projetId, setProjetId] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/document/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNom(data.nom);
        setType(data.type);
        setCheminAcces(data.cheminAcces);
        setProjetId(data.projetId);
      }
    };

    fetchData();
  }, [id]);

  const utilisateurId = localStorage.getItem('uid');

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
      nom: nom,
      type: type,
      cheminAcces: cheminAcces,
      utilisateurId: utilisateurId, // Utilisation de la valeur récupérée depuis le localStorage
      projetId: projetId,
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
      alert('Document mis à jour avec succès');
      navigate(`/documents-projet/${projetId}`);
      // Réinitialisation des états après la mise à jour
      setNom('');
      setType('');
      setCheminAcces('');
      setProjetId('');
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
        </select>
      </label>
      <label>
        Chemin d'accès:
        <input type="text" value={cheminAcces} onChange={(e) => setCheminAcces(e.target.value)} />
      </label>
      <label>
        ID de l'utilisateur:
        <input type="text" value={utilisateurId} readOnly />
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