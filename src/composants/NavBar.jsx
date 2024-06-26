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

// Dans la fonction LinksForRole, ajoutez le lien "Mes Notifications" pour les utilisateurs standard
// Dans la fonction LinksForRole, ajoutez le lien "Envoyer un Message" pour les rôles PDG et ChefDeProjet
function LinksForRole({ role }) {
  // Affiche le lien "Projets" uniquement pour les rôles spécifiés
  if (["PDG", "ChefDeProjet", "UtilisateurStandard"].includes(role)) {
    return (
      <>
        <CustomLink to="/projets" className={styles.linkStyle}>
          Projets
        </CustomLink>
        {role === "PDG" && (
          <>
            <CustomLink to="/creer-projet" className={styles.linkStyle}>
              Créer un projet
            </CustomLink>
            <CustomLink to="/taches" className={styles.linkStyle}>
              Tâches
            </CustomLink>
            <CustomLink to="/creer-tache" className={styles.linkStyle}>
              Créer une tâche
            </CustomLink>
            
            <CustomLink to="/documents" className={styles.linkStyle}>
              Documents
            </CustomLink>
            <CustomLink to="/creer-document" className={styles.linkStyle}>
              Créer un document
            </CustomLink>
            <CustomLink to="/users" className={styles.linkStyle}>
              Utilisateurs
            </CustomLink>
            <CustomLink to="/send-message" className={styles.linkStyle}>
              Envoyer un Message
            </CustomLink>
          </>
        )}
        {role === "ChefDeProjet" && (
          <CustomLink to="/send-message" className={styles.linkStyle}>
            Envoyer un Message
          </CustomLink>
        )}
        {role === "UtilisateurStandard" && (
          <CustomLink to="/notifications" className={styles.linkStyle}>
            Mes Notifications
          </CustomLink>
        )}
      </>
    );
  } else if (role === "AdministrateurInfrastructure") {
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
  } else {
    // Pour les autres rôles, aucun lien spécifique n'est affiché
    return null;
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
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
        <CustomLink to="/" className={styles.linkStyle}>
          Accueil
        </CustomLink>
        {user && <LinksForRole role={role} />}
      </div>
      <UserSection user={user} />
    </nav>
  );
}
export default NavBar;
