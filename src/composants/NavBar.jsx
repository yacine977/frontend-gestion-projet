import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

// Composant pour créer des liens personnalisés avec le style et la navigation
function CustomLink({ to, children, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

// Génère des liens spécifiques en fonction du rôle de l'utilisateur
function LinksForRole({ role }) {
  switch (role) {
    case "PDG":
      return (
        <>
          <CustomLink to="/projets" className={styles.linkStyle}>
            Projets
          </CustomLink>
          <CustomLink to="/creer-projet" className={styles.linkStyle}>
            Créer un projet
          </CustomLink>
          <CustomLink to="/taches" className={styles.linkStyle}>
            Tâches
          </CustomLink>
          <CustomLink to="/creer-tache" className={styles.linkStyle}>
            Créer une tâche
          </CustomLink>
          <CustomLink to="/users" className={styles.linkStyle}>
            Utilisateurs
          </CustomLink>
        </>
      );
    case "ChefDeProjet":
    case "UtilisateurStandard": // Cas pour ChefDeProjet et UtilisateurStandard
      return (
        <>
          <CustomLink to="/projets" className={styles.linkStyle}>
            Projets
          </CustomLink>
        </>
      );
    case "AdministrateurInfrastructure":
      return (
        <>
          <CustomLink to="/users" className={styles.linkStyle}>
            Utilisateurs
          </CustomLink>
          <CustomLink to="/createUser" className={styles.linkStyle}>
            Créer un utilisateur
          </CustomLink>
        </>
      );
    default:
      return (
        <>
          <CustomLink to="/projets" className={styles.linkStyle}>
            Projets
          </CustomLink>
        </>
      );
  }
}

// Section utilisateur pour la connexion, l'inscription ou l'affichage de l'utilisateur connecté
function UserSection({ user }) {
  return user ? (
    <>
      <div className={styles.linkStyle} style={{ marginLeft: "10px" }}>
        Connecté en tant que : <strong>{user.email}</strong>
      </div>
      <br />
      <CustomLink to="/deconnexion" className={styles.specialLinkStyle}>
        Déconnexion
      </CustomLink>
    </>
  ) : (
    <>
      <CustomLink
        to="/inscription"
        className={`${styles.specialLinkStyle} ${styles.specialLinkStyleMargin}`}
      >
        Inscription
      </CustomLink>
      <CustomLink to="/connexion" className={styles.specialLinkStyle}>
        Connexion
      </CustomLink>
    </>
  );
}

// Barre de navigation principale
function NavBar() {
  const user = JSON.parse(localStorage.getItem("user")); // Récupère l'utilisateur depuis le localStorage
  const role = localStorage.getItem("role"); // Récupère le rôle de l'utilisateur

  return (
    <nav className={styles.navStyle}>
      <h1 className={styles.linkStyle} style={{ flexGrow: 1 }}>
        Mon Application
      </h1>
      <div>
        <CustomLink to="/" className={styles.linkStyle}>
          Accueil
        </CustomLink>

        
        {user ? (
          <>
            <LinksForRole role={role} />
            <UserSection user={user} />
          </>
        ) : (
          <UserSection />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
