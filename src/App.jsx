// Importation des bibliothèques et composants nécessaires
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import CreerReunion from "./composants/CreerReunion";
import ModifierReunion from "./composants/ModifierReunion";
import Inscription from "./composants/Inscription";
import Connexion from "./composants/Connexion";
import Deconnexion from "./composants/Deconnexion";
import UserList from "./composants/UsersList";
import ReunionProjet from "./composants/ReunionProjet";
import CreateUser from "./composants/CreateUser";
import ListeTacheUtilisateur from "./composants/ListeTacheUtilisateur";
import ListeTachesProjetUtilisateur from "./composants/ListeTachesProjetUtilisateur";
import ReunionProjetUtilisateur from "./composants/ReunionProjetUtilisateur";
import NotificationsUtilisateur from "./composants/NotificationsUtilisateur";

function App() {
  // État local inutilisé, pourrait être supprimé si non utilisé dans le futur
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          {/* Routes pour la navigation dans l'application */}
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
          <Route path="/creer-reunion/:projetId?" element={<CreerReunion />} />
          <Route
            path="/documents-projet/:projetId"
            element={<ProjectDocuments />}
          />
          <Route path="/reunion-projet/:projetId" element={<ReunionProjet />} />
          <Route path="/reunions" element={<ListeReunions />} />
          <Route path="/modifier-reunion/:id" element={<ModifierReunion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/deconnexion" element={<Deconnexion />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route
            path="/liste-tache-utilisateur/:uid"
            element={<ListeTacheUtilisateur />}
          />
          <Route path="/taches-projet-utilisateur/:projetId" element={<ListeTachesProjetUtilisateur />} />
          <Route path="/reunion-projet-utilisateur/:projetId" element={<ReunionProjetUtilisateur />} />
          <Route path="/notifications" element={<NotificationsUtilisateur />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
