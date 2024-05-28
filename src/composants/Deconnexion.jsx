import React, { useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import app from '../firebase';

function Deconnexion() {
  useEffect(() => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      // Supprimer les informations de l'utilisateur du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      // Rafraîchir la page et rediriger l'utilisateur vers la page d'accueil
      window.location.reload();
      window.location.pathname = '/';
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion', error);
    });
  }, []);

  return null;
}

export default Deconnexion;