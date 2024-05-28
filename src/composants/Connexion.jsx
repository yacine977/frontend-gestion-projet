import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase'; // Assurez-vous que le chemin est correct

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const connexion = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    // Dans votre composant Connexion
    signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  userCredential.user.getIdTokenResult().then((idTokenResult) => {
    // Stocker le jeton d'authentification et les informations de l'utilisateur dans le localStorage
    localStorage.setItem('token', idTokenResult.token);
    localStorage.setItem('user', JSON.stringify(userCredential.user));
    localStorage.setItem('role', idTokenResult.claims.role); // Ajoutez cette ligne
    console.log('Connexion réussie');
    alert('Connexion réussie');
    // Rediriger l'utilisateur connecté vers la page d'accueil
    window.location.pathname = '/';
    
  });
})
.catch((error) => {
  console.error('Erreur lors de la connexion', error);
  alert('Erreur lors de la connexion: ' + error.message);
});
  };

  return (
    <form onSubmit={connexion}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Connexion;