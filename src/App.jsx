import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Modifiez cette ligne

import "./App.css";
import ListeDesProjets from "./composants/ListeDesProjets";
import CreerProjet from "./composants/CreerProjet";
import HomePage from "./composants/HomePage";
import NavBar from "./composants/NavBar";
import ModifierProjet from "./composants/ModifierProjet";
import ListeDesTaches from "./composants/ListeDesTaches";
import CreerTache from "./composants/CreerTache";
import ModifierTache from "./composants/ModifierTache";
import CreerDocument from "./composants/CreerDocument";
import ListeDocuments from "./composants/ListeDocuments";
import UpdateDocumentForm from "./composants/UpdateDocumentForm";
import DetailProjet from "./composants/DetailProjet";
import TachesProjet from "./composants/TachesProjet";
import ProjectDocuments from "./composants/ProjectDocuments";
import ListeReunions from "./composants/ListeReunions";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ListeDesProjets />} />
          <Route path="/creer-projet" element={<CreerProjet />} />
          <Route path="/modifier-projet/:id" element={<ModifierProjet />} />
          <Route path="/taches" element={<ListeDesTaches />} />
          <Route path="/modifier-tache/:id" element={<ModifierTache />} />
          <Route path="/documents" element={<ListeDocuments />} />
          <Route
            path="/UpdateDocumentForm/:id"
            element={<UpdateDocumentForm />}
          />
          <Route path="/detail-projet/:id" element={<DetailProjet />} />
          <Route path="/taches-projet/:projetId" element={<TachesProjet />} />
          <Route path="/creer-tache/:projetId?" element={<CreerTache />} />
          <Route
            path="/creer-document/:projetId?"
            element={<CreerDocument />}
          />
          <Route
            path="/documents-projet/:projetId"
            element={<ProjectDocuments />}
          />
          <Route path="/reunions" element={<ListeReunions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
