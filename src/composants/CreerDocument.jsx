import React, { useState } from 'react';

function CreerDocument() {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [cheminAcces, setCheminAcces] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');
  

  const soumettre = async (event) => {
    event.preventDefault();
    const doc = { nom, type, cheminAcces, utilisateurId };

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
        
      } else {
        alert('Erreur lors de la création du document');
      }
  };

  return (
    <div>
    <form onSubmit={soumettre}>
      <label>
        Nom:
        <input type="text" value={nom} onChange={e => setNom(e.target.value)} required />
      </label>
      <label>
        Type:
        <input type="text" value={type} onChange={e => setType(e.target.value)} required />
      </label>
      <label>
        Chemin d'accès:
        <input type="text" value={cheminAcces} onChange={e => setCheminAcces(e.target.value)} required/>
      </label>
      <label>
        ID de l'utilisateur:
        <input type="text" value={utilisateurId} onChange={e => setUtilisateurId(e.target.value)} required />
      </label>
      <input type="submit" value="Créer" />
    </form>
     
    </div>
  );
}

export default CreerDocument;