import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/CreerTache.css';

function ModifierTache() {
  const { id } = useParams();
  const history = useNavigate();
  const [description, setDescription] = useState('');
  const [priorite, setPriorite] = useState(0);
  const [statut, setStatut] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  const [projetId, setProjetId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTache = async () => {
      const response = await fetch(`http://localhost:3000/tache/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la tâche');
      }
      const data = await response.json();
      const tache = data;

      const dateDebut = new Date(tache.dateDebut).toISOString().split('T')[0];
      const dateFinPrevu = new Date(tache.dateFinPrevu).toISOString().split('T')[0];
      const dateFinReel = tache.dateFinReel ? new Date(tache.dateFinReel).toISOString().split('T')[0] : '';

      setDescription(tache.description || '');
      setPriorite(tache.priorite || 0);
      setStatut(tache.statut || '');
      setDateDebut(dateDebut || '');
      setDateFinPrevu(dateFinPrevu || '');
      setDateFinReel(dateFinReel || '');
      setProjetId(tache.projetId || 0);
    };

    fetchTache();
  }, [id]);

  const validateForm = () => {
    let formErrors = {};
    if (!description) formErrors.description = "La description est requise";
    if (!priorite) formErrors.priorite = "La priorité est requise";
    if (!statut) formErrors.statut = "Le statut est requis";
    if (!dateDebut) formErrors.dateDebut = "La date de début est requise";
    if (!dateFinPrevu) formErrors.dateFinPrevu = "La date de fin prévue est requise";
    if (!projetId) formErrors.projetId = "L'ID du projet est requis";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const tache = { 
      description, priorite, statut, dateDebut, dateFinPrevu, dateFinReel, projetId };

    try {
      const response = await fetch(`http://localhost:3000/tache/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tache),
      });

      if (response.ok) {
  alert('Tâche modifiée avec succès');
  history('http://localhost:5173/taches'); // Redirige vers la page d'accueil
} else {
  if (response.headers.get('content-type').includes('application/json')) {
    const errorData = await response.json();
    console.error('Erreur lors de la modification de la tâche :', errorData);
  } else {
    console.error('Erreur lors de la modification de la tâche :', await response.text());
  }
  alert('Erreur lors de la modification de la tâche');
}
} catch (error) {
  console.error('Erreur lors de la modification de la tâche :', error);
} finally {
  setIsLoading(false);
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
      <button type="submit" className='submit-button' disabled={isLoading}>
        {isLoading ? 'Modification en cours...' : 'Modifier la tâche'}
      </button>
    </form>
  );
}

export default ModifierTache;