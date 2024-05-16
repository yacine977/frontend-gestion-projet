import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Modifiez cette ligne

import './App.css';
import ListeDesProjets from './composants/ListeDesProjets';
import CreerProjet from './composants/CreerProjet';
import HomePage from './composants/HomePage';
import NavBar from './composants/NavBar';
import ModifierProjet from './composants/ModifierProjet';
import ListeDesTaches from './composants/ListeDesTaches';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />
      <div>
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ListeDesProjets />} /> {/* Modifiez cette ligne */}
          <Route path="/creer-projet" element={<CreerProjet />} /> {/* Modifiez cette ligne */}
          <Route path="/modifier-projet/:id" element={<ModifierProjet />} /> {/* Modifiez cette ligne */}
          <Route path="/taches" element={<ListeDesTaches />} /> {/* Modifiez cette ligne */}
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;