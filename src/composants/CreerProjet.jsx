import { useState } from 'react';
import '../styles/ProjetForm.css'

function CreerProjet() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  const [chefDeProjetId, setChefDeProjetId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projet = { nom, description, dateDebut, dateFinPrevu, dateFinReel, chefDeProjetId };

    const response = await fetch('http://localhost:3000/projet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projet),
    });

    if (response.ok) {
      alert('Projet créé avec succès');
    } else {
      alert('Erreur lors de la création du projet');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='creer-projet'>
      <label>
        Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Date de début:
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
      </label>
      <label>
        Date de fin prévue:
        <input type="date" value={dateFinPrevu} onChange={(e) => setDateFinPrevu(e.target.value)} required />
      </label>
      <label>
        Date de fin réelle:
        <input type="date" value={dateFinReel} onChange={(e) => setDateFinReel(e.target.value)} />
      </label>
      <label>
        Chef de projet ID:
        <input type="number" value={chefDeProjetId} onChange={(e) => setChefDeProjetId(e.target.value)} required />
      </label>
      <button type="submit">Créer le projet</button>
    </form>
  );
}

export default CreerProjet;