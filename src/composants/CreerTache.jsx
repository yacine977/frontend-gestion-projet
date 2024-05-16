import { useState } from 'react';
import '../styles/CreerTache.css';

function CreerTache() {
  const [description, setDescription] = useState('');
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  const [projetId, setProjetId] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tache = { description, priorite, statut, dateDebut, dateFinPrevu, dateFinReel, projetId };

    const response = await fetch('http://localhost:3000/tache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tache),
    });

    if (response.ok) {
      alert('Tâche créée avec succès');
      setDescription('');
      setPriorite(0);
      setStatut('');
      setDateDebut('');
      setDateFinPrevu('');
      setDateFinReel('');
      setProjetId(0);
    } else {
      alert('Erreur lors de la création de la tâche');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='creer-tache'>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Priorité:
        <input type="number" value={priorite} onChange={(e) => setPriorite(e.target.value)} required />
      </label>
      <label>
        Statut:
        <input type="text" value={statut} onChange={(e) => setStatut(e.target.value)} required />
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
        ID du projet:
        <input type="number" value={projetId} onChange={(e) => setProjetId(e.target.value)} required />
      </label>
      <button type="submit" className='submit-button'>Créer une tâche</button>
    </form>
  );
}

export default CreerTache;