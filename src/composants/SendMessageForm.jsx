import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/SendMessageForm.css'; // Assurez-vous d'ajouter ce fichier CSS dans votre projet

function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [dateHeure, setDateHeure] = useState(() => {
    const now = new Date();
    return now.toLocaleString('sv', { timeZone: 'Europe/Brussels' }).slice(0, 16);
  });
  const [utilisateurId, setUtilisateurId] = useState('');
  const [users, setUsers] = useState([]); // État pour stocker la liste des utilisateurs
  const navigate = useNavigate();

  // Fonction pour récupérer la liste des utilisateurs depuis le backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/utilisateur/getAllUsers');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data); // Mettre à jour l'état des utilisateurs avec la réponse
    } catch (error) {
      console.error(error.message);
      alert('Erreur lors de la récupération des utilisateurs');
    }
  };

  useEffect(() => {
    fetchUsers(); // Appeler fetchUsers une seule fois après le montage du composant
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Conversion de la dateHeure de l'état au format MySQL
      const dateHeureMySQL = new Date(dateHeure).toISOString().slice(0, 19).replace('T', ' ');

      const response = await fetch('http://localhost:3000/notification/nouvelle-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message, 
          dateHeure: dateHeureMySQL, // Utiliser la date formatée pour l'envoi
          utilisateurId 
        }),
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
          <label>Sélectionner le destinataire:</label>
          <select
            className="form-control"
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(e.target.value)}
          >
            <option value="">Sélectionner un utilisateur</option>
            {users.map((user) => (
              <option key={user.utilisateurId} value={user.utilisateurId}>
                {user.nom} {user.prenom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Créer Notification</button>
      </form>
    </div>
  );
}

export default SendMessageForm;
