import React, { useEffect, useState } from "react";
import "../styles/UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCheck,
  faProjectDiagram,
  faTrashAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

function UserList() {
  const [users, setUsers] = useState([]);
  const userRole = localStorage.getItem("role");
  

  useEffect(() => {
    fetch("http://localhost:3000/utilisateur/allUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  }, []);

  const getRole = async (uid) => {
    const response = await fetch(
      `http://localhost:3000/utilisateur/getRole/${uid}`
    );
    const data = await response.json();
    return data.role;
  };

  const setRole = async (uid, role) => {
    const response = await fetch("http://localhost:3000/utilisateur/setRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, role }),
    });
    const data = await response.json();
    alert(data.message);
  };

  // Ajouter cette fonction dans le composant UserList
  const assignerProjet = async (uid) => {
    const idProjet = prompt("Entrez l'ID du projet à assigner:");
    if (idProjet) {
      try {
        const response = await fetch(
          `http://localhost:3000/projet/${idProjet}/assigner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid }),
          }
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        alert(
          `Utilisateur assigné au projet avec succès. ID de l'assignation: ${data.insertId}`
        );
      } catch (error) {
        console.error(
          "Erreur lors de l'assignation de l'utilisateur au projet :",
          error
        );
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  const voirProjetsAssignes = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:3000/projet/utilisateur/${uid}`
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const projets = await response.json();
      // Étape 4 : Afficher les résultats
      alert(`Projets assignés: ${projets.map((p) => p.nom).join(", ")}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des projets assignés :",
        error
      );
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="userListContainer">
      <h1>Liste des utilisateurs</h1>
      {users.map((user) => (
        <div className="userCard" key={user.uid}>
          <h2>{user.displayName}</h2>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          {userRole === "AdministrateurInfrastructure" && (
            <>
          <select
            className="roleSelector"
            onChange={(e) => setRole(user.uid, e.target.value)}
          >
            <option value="">Définir un rôle</option>
            <option value="PDG">PDG</option>
            <option value="ChefDeProjet">Chef de projet</option>
            <option value="UtilisateurStandard">Utilisateur standard</option>
            <option value="AdministrateurInfrastructure">
              Administrateur d'infrastructure
            </option>
          </select>
          <button
            className="roleButton"
            onClick={() =>
              getRole(user.uid).then((role) => alert(`Role: ${role}`))
            }
          >
            <FontAwesomeIcon icon={faUserCheck} /> Voir le rôle
          </button>
          </>
          )}
          <button
            className="assignButton"
            onClick={() => assignerProjet(user.uid)}
          >
            <FontAwesomeIcon icon={faProjectDiagram} /> Assigner à un projet
          </button>
          <button
            className="viewProjectsButton"
            onClick={() => voirProjetsAssignes(user.uid)}
          >
            <FontAwesomeIcon icon={faProjectDiagram} /> Voir les projets
            assignés
          </button>
          <button
            className="updateButton"
            onClick={async () => {
              const email = prompt("Entrez le nouvel email de l'utilisateur:");
              const password = prompt(
                "Entrez le nouveau mot de passe de l'utilisateur:"
              );
              if (email && password) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/utilisateur/updateUser/${user.uid}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ email, password }),
                    }
                  );
                  if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                  }
                  const data = await response.json();
                  alert(data.message);
                  // Optionnel: Actualiser la liste des utilisateurs après la mise à jour
                } catch (error) {
                  console.error(
                    "Erreur lors de la mise à jour de l'utilisateur :",
                    error
                  );
                  alert("Une erreur est survenue. Veuillez réessayer.");
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faUserEdit} /> Mettre à jour
          </button>
          <button
            className="deleteButton"
            onClick={async () => {
              const confirmation = window.confirm(
                "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
              );
              if (confirmation) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/utilisateur/deleteUser/${user.uid}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                  }
                  const data = await response.json();
                  alert(data.message);
                  // Actualiser la liste des utilisateurs après la suppression
                  setUsers(users.filter((u) => u.uid !== user.uid));
                } catch (error) {
                  console.error(
                    "Erreur lors de la suppression de l'utilisateur :",
                    error
                  );
                  alert("Une erreur est survenue. Veuillez réessayer.");
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
