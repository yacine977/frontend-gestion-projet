import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <nav
      style={{
        backgroundColor: "#282c34",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {" "}
      <h1 style={{ color: "white", flexGrow: 1 }}> Mon Application </h1>{" "}
      <div>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
        >
          Accueil
        </Link>
        {user && (
          <>
            {role === "PDG" && (
              <>
                <Link
                  to="/projets"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "0 10px",
                  }}
                >
                  Projets
                </Link>
                <Link
                  to="/creer-projet"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "0 10px",
                  }}
                >
                  Créer un projet
                </Link>
              </>
            )}
            <Link
              to="/taches"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Tâches
            </Link>
            {(role === "ChefDeProjet" || role === "PDG") && (
              <Link
                to="/creer-tache"
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Créer une tâche
              </Link>
            )}
            <Link
              to="/creer-document"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Créer un document
            </Link>
            {(role === "AdministrateurInfrastructure" || role === "PDG") && (
              <Link
                to="/users"
                style={{
                  color: "white",
                  textDecoration: "none",
                  margin: "0 10px",
                }}
              >
                Utilisateurs
              </Link>
            )}
            <Link
              to="/documents"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Documents
            </Link>
            <Link
              to="/reunions"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Réunions
            </Link>
            <Link
              to="/creer-reunion"
              style={{
                color: "white",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Créer une réunion
            </Link>
            <div style={{ color: "white", marginLeft: "10px" }}>
              Connecté en tant que : <strong>{user.email}</strong>
            </div>
            <br />
            <Link
              to="/deconnexion"
              style={{
                color: "#FF4500",
                backgroundColor: "#282c34",
                textDecoration: "none",
                margin: "0 10px",
                fontSize: "25px",
                padding: "5px",
                borderRadius: "5px",
                border: "2px solid #FF4500",
              }}
            >
              Déconnexion
            </Link>
          </>
        )}
        {!user && (
          <>
            <Link
              to="/inscription"
              style={{
                color: "#FFD700",
                backgroundColor: "#282c34",
                textDecoration: "none",
                margin: "0 10px",
                fontSize: "25px",
                padding: "5px",
                borderRadius: "5px",
                border: "2px solid #FFD700",
              }}
            >
              Inscription
            </Link>
            <Link
              to="/connexion"
              style={{
                color: "#FFD700",
                backgroundColor: "#282c34",
                textDecoration: "none",
                margin: "0 10px",
                fontSize: "25px",
                padding: "5px",
                borderRadius: "5px",
                border: "2px solid #FFD700",
              }}
            >
              Connexion
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
