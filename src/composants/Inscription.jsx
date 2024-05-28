import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase'; // Assurez-vous que le chemin est correct

function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inscription = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert('Le mot de passe doit comporter au moins 6 caractères');
      return;
    }
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Inscription réussie');
      alert('Inscription réussie');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'inscription', error);
      alert('Erreur lors de l\'inscription: ' + error.message);
    });
  };

  return (
    <form onSubmit={inscription}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Inscription;