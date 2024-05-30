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

    // Vérifier si le nom et la description ne sont pas vides
    if (!nom.trim() || !description.trim()) {
      alert('Le nom et la description ne peuvent pas être vides');
      return;
    }

    // Vérifier si l'ID du chef de projet est un nombre
    if (isNaN(chefDeProjetId) || chefDeProjetId < 1) {
      alert('L\'ID du chef de projet doit être un nombre positif');
      return;
    }

    // Convertir les dates en objets Date pour la comparaison
    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    const finReel = new Date(dateFinReel);

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

    const projet = { nom, description, dateDebut, dateFinPrevu, dateFinReel, chefDeProjetId };

    const response = await fetch('http://localhost:3000/projet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(projet),
    });

    if (response.ok) {
      alert('Projet créé avec succès');
      setNom('');
      setDescription('');
      setDateDebut('');
      setDateFinPrevu('');
      setDateFinReel('');
      setChefDeProjetId('');
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