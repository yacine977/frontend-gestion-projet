import { useState } from 'react';
import '../styles/CreerTache.css';
import { useParams } from 'react-router-dom';

function CreerTache() {
  const [description, setDescription] = useState('');
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  const { projetId: initialProjetId } = useParams();
const [projetId, setProjetId] = useState(initialProjetId || 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si la description et le statut ne sont pas vides
    if (!description.trim() || !statut.trim()) {
      alert('La description et le statut ne peuvent pas être vides');
      return;
    }

    // Convertir les dates en objets Date pour la comparaison
    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    const finReel = dateFinReel ? new Date(dateFinReel) : null;

    // Vérifier si la date de début est supérieure à la date de fin prévue
    if (debut > finPrevu) {
      alert('La date de début ne peut pas être supérieure à la date de fin prévue');
      return;
    }

    // Vérifier si la date de fin réelle est inférieure à la date de début
    if (finReel && finReel < debut) {
      alert('La date de fin réelle ne peut pas être inférieure à la date de début');
      return;
    }

    

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
        <input type="date" value={dateFinReel} onChange={(e) => setDateFinReel(e.target.value)}  />
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