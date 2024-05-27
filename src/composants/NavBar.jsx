import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ color: 'white', flexGrow: 1 }}>
        Mon Application
      </h1>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Accueil</Link>
        <Link to="/projets" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Projets</Link>
        <Link to="/creer-projet" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer un projet</Link>
        <Link to="/taches" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Tâches</Link>
        <Link to="/creer-tache" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer une tâche</Link>
        <Link to="/creer-document" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer un document</Link>
        <Link to="/documents" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Documents</Link>
        <Link to="/reunions" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Réunions</Link>
        <Link to="/creer-reunion" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>Créer une réunion</Link>
      </div>
    </nav>
  );
}

export default NavBar;