import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

function CustomLink({ to, children, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function LinksForRole({ role, newNotifications }) {
  return (
    <>
      {["PDG", "ChefDeProjet", "UtilisateurStandard", "AdministrateurInfrastructure"].includes(role) && (
        <CustomLink to="/notifications" className={styles.linkStyle}>
          Mes Notifications
          {newNotifications > 0 && (
            <span className={styles.notificationBadge}>{newNotifications}</span>
          )}
        </CustomLink>
      )}
      {role === "PDG" && (
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
          <CustomLink to="/documents" className={styles.linkStyle}>
            Documents
          </CustomLink>
          <CustomLink to="/creer-document" className={styles.linkStyle}>
            Créer un document
          </CustomLink>
          <CustomLink to="/users" className={styles.linkStyle}>
            Utilisateurs
          </CustomLink>
        </>
      )}
      {(role === "ChefDeProjet" || role === "UtilisateurStandard") && (
        <CustomLink to="/projets-assignes" className={styles.linkStyle}>
          Mes projets assignés
        </CustomLink>
      )}
      {role === "AdministrateurInfrastructure" && (
        <>
          <CustomLink to="/users" className={styles.linkStyle}>
            Utilisateurs
          </CustomLink>
          <CustomLink to="/createUser" className={styles.linkStyle}>
            Créer un utilisateur
          </CustomLink>
        </>
      )}
      <CustomLink to="/send-message" className={styles.linkStyle}>
        Envoyer un Message
      </CustomLink>
    </>
  );
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

function NavBar() {
  const [newNotifications, setNewNotifications] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const utilisateurId = localStorage.getItem("uid");

  useEffect(() => {
    if (utilisateurId) {
      fetch(`http://localhost:3000/notification/notifications/${utilisateurId}/new`)
        .then((response) => response.json())
        .then((data) => {
          setNewNotifications(data.newNotificationsCount);
        })
        .catch((error) => console.error("Erreur lors de la vérification des nouvelles notifications:", error));
    }
  }, [utilisateurId]);

  return (
    <nav className={styles.navStyle}>
      <h1 className={styles.linkStyle} style={{ flexGrow: 1 }}>
        Mon Application
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
        <CustomLink to="/" className={styles.linkStyle}>
          Accueil
        </CustomLink>
        {user && <LinksForRole role={role} newNotifications={newNotifications} />}
      </div>
      <UserSection user={user} />
    </nav>
  );
}

export default NavBar;
