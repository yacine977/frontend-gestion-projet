import React, { useState } from 'react';

function CreerNotification() {
  const [message, setMessage] = useState('');
  const [dateHeure, setDateHeure] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/notification/nouvelle-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, dateHeure, utilisateurId }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la notification');
      }

      const data = await response.json();
      alert(`Notification créée avec succès. ID: ${data.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <label>Date et Heure:</label>
        <input
          type="datetime-local"
          value={dateHeure}
          onChange={(e) => setDateHeure(e.target.value)}
        />
      </div>
      <div>
        <label>ID Utilisateur:</label>
        <input
          type="text" // Modifié pour accepter un UID sous forme de texte
          value={utilisateurId}
          onChange={(e) => setUtilisateurId(e.target.value)}
        />
      </div>
      <button type="submit">Créer Notification</button>
    </form>
  );
}

export default CreerNotification;