// Importation de React et des styles spécifiques à la page d'accueil
import React from "react";
import "../styles/HomePage.css";

// Composant fonctionnel HomePage pour la page d'accueil
function HomePage() {
  // Rendu du contenu de la page d'accueil
  return (
    <div className="home-page">
      {/* Titre principal de la page */}
      <h1>Application de Gestion de Projets</h1>
      {/* Sous-titre de bienvenue */}
      <h2>Bienvenue sur la page d'accueil</h2>
      {/* Paragraphe de description */}
      <p>Ceci est la page d'accueil de l'application de gestion de projets.</p>
    </div>
  );
}

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default HomePage;
