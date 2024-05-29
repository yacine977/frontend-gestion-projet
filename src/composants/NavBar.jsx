import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  return (
    <nav style={{ backgroundColor: '#282c34', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ color: 'white', flexGrow: 1 }}>
        Mon Application
      </h1>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Accueil</Link>
        {role === 'PDG' && (
          <>
        <Link to="/projets" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Projets</Link>
        <Link to="/creer-projet" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer un projet</Link>
        </>
        )}
        <Link to="/taches" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Tâches</Link>
        {(role === 'ChefDeProjet' || role === 'PDG') && (
        <Link to="/creer-tache" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer une tâche</Link>
      )}
        <Link to="/creer-document" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer un document</Link>
        <Link to="/users" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Utilisateurs</Link>
        <Link to="/documents" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Documents</Link>
        <Link to="/reunions" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Réunions</Link>
        <Link to="/creer-reunion" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer une réunion</Link>
        {user && (
          <>
            <div style={{ color: 'white', marginLeft: '10px' }}>
              Connecté en tant que : <strong>{user.email}</strong>
            </div>
            <Link to="/deconnexion" style={{ color: '#FF4500', textDecoration: 'none', margin: '0 10px', fontSize: '20px' }}>Déconnexion</Link>
          </>
        )}
        {!user && (
          <>
            <Link to="/inscription" style={{ color: '#FFD700', textDecoration: 'none', margin: '0 10px', fontSize: '20px' }}>Inscription</Link>
            <Link to="/connexion" style={{ color: '#FFD700', textDecoration: 'none', margin: '0 10px', fontSize: '20px' }}>Connexion</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;