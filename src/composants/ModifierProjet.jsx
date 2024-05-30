import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProjetForm.css'

function ModifierProjet() {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevu, setDateFinPrevu] = useState('');
  const [dateFinReel, setDateFinReel] = useState('');
  const [chefDeProjetId, setChefDeProjetId] = useState('');

  useEffect(() => {
    const fetchProjet = async () => {
      const response = await fetch(`http://localhost:3000/projet/${id}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
      //ajouter le token d'authentification
      
        
      
      const data = await response.json();
      const projet = data[0]; // Accédez au premier élément du tableau

      // Convertir les dates au format yyyy-mm-dd
      const dateDebut = new Date(projet.dateDebut).toISOString().split('T')[0];
      const dateFinPrevu = new Date(projet.dateFinPrevu).toISOString().split('T')[0];
      const dateFinReel = projet.dateFinReel ? new Date(projet.dateFinReel).toISOString().split('T')[0] : '';

      setNom(projet.nom);
      setDescription(projet.description);
      setDateDebut(dateDebut);
      setDateFinPrevu(dateFinPrevu);
      setDateFinReel(dateFinReel);
      setChefDeProjetId(projet.chefDeProjetId);
    };

    fetchProjet();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation des champs
    if (nom.trim() === '' || description.trim() === '') {
      alert('Le nom et la description ne peuvent pas être vides');
      return;
    }

    if (isNaN(chefDeProjetId) || chefDeProjetId < 1) {
      alert('L\'ID du chef de projet doit être un nombre positif');
      return;
    }

    // Convertir les dates en objets Date pour la comparaison
    const debut = new Date(dateDebut);
    const finPrevu = new Date(dateFinPrevu);
    let finReel;

if (dateFinReel) {
  finReel = new Date(dateFinReel);
}

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

    const response = await fetch(`http://localhost:3000/projet/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajoutez cette ligne
  },
  body: JSON.stringify(projet),
});

    if (response.ok) {
      alert('Projet modifié avec succès');
    } else {
      alert('Erreur lors de la modification du projet');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='creer-projet'>
      <label>
        Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)}  />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}  />
      </label>
      <label>
        Date de début:
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}  />
      </label>
      <label>
        Date de fin prévue:
        <input type="date" value={dateFinPrevu} onChange={(e) => setDateFinPrevu(e.target.value)}  />
      </label>
      <label>
        Date de fin réelle:
        <input type="date" value={dateFinReel} onChange={(e) => setDateFinReel(e.target.value)} />
      </label>
      <label>
        Chef de projet ID:
        <input type="number" value={chefDeProjetId} onChange={(e) => setChefDeProjetId(e.target.value)}  />
      </label>
      
      <button type="submit">Modifier le projet</button>
    </form>
  );
}

export default ModifierProjet;