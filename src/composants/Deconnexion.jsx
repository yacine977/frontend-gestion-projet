// Importation des dépendances nécessaires
import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase"; // Importation de la configuration Firebase

// Composant fonctionnel pour gérer la déconnexion
function Deconnexion() {
  useEffect(() => {
    // Initialisation de l'authentification Firebase
    const auth = getAuth(app);
    // Déconnexion de l'utilisateur
    signOut(auth)
      .then(() => {
        // Suppression des informations de l'utilisateur stockées localement
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        // Rafraîchissement de la page pour appliquer l'état de déconnexion
        window.location.reload();
        // Redirection vers la page d'accueil
        window.location.pathname = "/";
      })
      .catch((error) => {
        // Gestion des erreurs de déconnexion
        console.error("Erreur lors de la déconnexion", error);
      });
  }, []); // Le tableau vide indique que cet effet ne s'exécute qu'une fois, au montage du composant

  // Ce composant ne rend rien visuellement
  return null;
}

export default Deconnexion;
