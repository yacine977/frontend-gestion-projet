import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateDocumentForm() {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/document/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNom(data.nom);
        setType(data.type);
        setCheminAcces(data.cheminAcces);
        setUtilisateurId(data.utilisateurId);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nom: nom || undefined,
      type: type || undefined,
      cheminAcces: cheminAcces || undefined,
      utilisateurId: utilisateurId || undefined,
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
      alert('Document mis à jour avec succès');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <label>
        Type:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <label>
        Chemin d'accès:
        <input type="text" value={cheminAcces} onChange={(e) => setCheminAcces(e.target.value)} />
      </label>
      <label>
        ID de l'utilisateur:
        <input type="text" value={utilisateurId} onChange={(e) => setUtilisateurId(e.target.value)} />
      </label>
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateDocumentForm;