import { useState } from 'react';
import '../styles/ProjetForm.css'

function CreerProjet() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si le nom et la description ne sont pas vides
    if (!nom.trim() || !description.trim()) {
      alert('Le nom et la description ne peuvent pas être vides');
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

    const projet = { nom, description, dateDebut, dateFinPrevu, dateFinReel};

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
      
    } else {
      alert('Erreur lors de la création du projet');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='creer-projet'>
    <h2>Créer un nouveau projet</h2>
    <div className="input-group">
      <label>Nom:</label>
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
    </div>
    <div className="input-group">
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
    </div>
    <div className="input-group">
      <label>Date de début:</label>
      <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
    </div>
    <div className="input-group">
      <label>Date de fin prévue:</label>
      <input type="date" value={dateFinPrevu} onChange={(e) => setDateFinPrevu(e.target.value)} required />
    </div>
    <div className="input-group">
      <label>Date de fin réelle:</label>
      <input type="date" value={dateFinReel} onChange={(e) => setDateFinReel(e.target.value)} />
    </div>
    
    <button type="submit">Créer le projet</button>
  </form>
  );
}

export default CreerProjet;