import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/SendMessageForm.css'; // Assurez-vous d'ajouter ce fichier CSS dans votre projet

function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [dateHeure, setDateHeure] = useState('');
  const [utilisateurId, setUtilisateurId] = useState('');
  const navigate = useNavigate();

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
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="send-message-form-container">
      <form onSubmit={handleSubmit} className="send-message-form">
        <div className="form-group">
          <label>Message:</label>
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date et Heure:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={dateHeure}
            onChange={(e) => setDateHeure(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>ID Utilisateur:</label>
          <input
            type="text"
            className="form-control"
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer Notification</button>
      </form>
    </div>
  );
}

export default SendMessageForm;