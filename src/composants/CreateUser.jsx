import React, { useState } from 'react';
import styles from '../styles/CreateUser.module.css';

function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/utilisateur/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('La création de l’utilisateur a échoué');
      }

      const user = await response.json();
      setMessage(`Utilisateur créé : ${user.email}`);
      // Réinitialiser les champs après la création réussie
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
      // Optionnel : Réinitialiser les champs même en cas d'erreur
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Créer</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default CreateUser;