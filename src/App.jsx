import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Modifiez cette ligne

import './App.css';
import ListeDesProjets from './composants/ListeDesProjets';
import CreerProjet from './composants/CreerProjet';
import HomePage from './composants/HomePage';
import NavBar from './composants/NavBar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />
      <div>
       
        <Routes>
          <Route path="/projets" element={<ListeDesProjets />} /> {/* Modifiez cette ligne */}
          <Route path="/creer-projet" element={<CreerProjet />} /> {/* Modifiez cette ligne */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;