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
      </div>
    </nav>
  );
}

export default NavBar;