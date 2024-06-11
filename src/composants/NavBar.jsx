import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

function CustomLink({ to, children, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function LinksForRole({ role }) {
  switch (role) {
    case "PDG":
      return (
        <>
          <CustomLink to="/projets" className={styles.linkStyle}>Projets</CustomLink>
          <CustomLink to="/creer-projet" className={styles.linkStyle}>Créer un projet</CustomLink>
          <CustomLink to="/creer-tache" className={styles.linkStyle}>Créer une tâche</CustomLink>
          <CustomLink to="/users" className={styles.linkStyle}>Utilisateurs</CustomLink>
        </>
      );
    case "ChefDeProjet":
      return (
        <>
          <CustomLink to="/creer-tache" className={styles.linkStyle}>Créer une tâche</CustomLink>
        </>
      );
    case "AdministrateurInfrastructure":
      return (
        <>
          <CustomLink to="/users" className={styles.linkStyle}>Utilisateurs</CustomLink>
        </>
      );
    default:
      return null;
  }
}

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
      <CustomLink to="/inscription" className={styles.specialLinkStyle}>
        Inscription
      </CustomLink>
      <CustomLink to="/connexion" className={styles.specialLinkStyle}>
        Connexion
      </CustomLink>
    </>
  );
}

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <nav className={styles.navStyle}>
      <h1 className={styles.linkStyle} style={{ flexGrow: 1 }}>Mon Application</h1>
      <div>
        <CustomLink to="/" className={styles.linkStyle}>Accueil</CustomLink>
        {user && role === "AdministrateurInfrastructure" ? (
          <>
            <LinksForRole role={role} />
            <UserSection user={user} />
          </>
        ) : user ? (
          <>
            <LinksForRole role={role} />
            <CustomLink to="/taches" className={styles.linkStyle}>Tâches</CustomLink>
            <CustomLink to="/creer-document" className={styles.linkStyle}>Créer un document</CustomLink>
            <CustomLink to="/documents" className={styles.linkStyle}>Documents</CustomLink>
            <CustomLink to="/reunions" className={styles.linkStyle}>Réunions</CustomLink>
            <CustomLink to="/creer-reunion" className={styles.linkStyle}>Créer une réunion</CustomLink>
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
