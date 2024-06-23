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
    fetch("http://localhost:3000/utilisateur/getAllUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  }, []);

  const getRole = async (utilisateurId) => {
    const response = await fetch(
      `http://localhost:3000/utilisateur/getRole/${utilisateurId}`
    );
    const data = await response.json();
    return data.role;
  };

  const setRole = async (utilisateurId, role) => {
    const response = await fetch("http://localhost:3000/utilisateur/setRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: utilisateurId, role }), // Modifiez ici pour correspondre au back-end
    });
    const data = await response.json();
    alert(data.message);
  };

  const assignerProjet = async (utilisateurId) => {
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
            body: JSON.stringify({ uid: utilisateurId }), // Modification ici pour correspondre au back-end
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

  const voirProjetsAssignes = async (utilisateurId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/projet/utilisateur/${utilisateurId}`
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const projets = await response.json();
      alert(`Projets assignés: ${projets.map((p) => p.nom).join(", ")}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des projets assignés :",
        error
      );
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const updateUser = async (user) => {
    const email = prompt("Entrez le nouvel email de l'utilisateur:", user.email);
    const nom = prompt("Entrez le nouveau nom de l'utilisateur:", user.nom);
    const prenom = prompt("Entrez le nouveau prénom de l'utilisateur:", user.prenom);
    const telephone = prompt("Entrez le nouveau téléphone de l'utilisateur:", user.telephone);
    const motDePasse = prompt("Entrez le nouveau mot de passe de l'utilisateur:");

    if (email && nom && prenom && telephone && motDePasse) {
      try {
        const response = await fetch(
          `http://localhost:3000/utilisateur/updateUser/${user.utilisateurId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, nom, prenom, telephone, motDePasse }),
          }
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        alert(data.message);
        // Optionnel: Actualiser la liste des utilisateurs après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="userListContainer">
      <h1>Liste des utilisateurs</h1>
      {users.map((user) => (
        <div className="userCard" key={user.utilisateurId}>
        <h2>{user.nom} {user.prenom}</h2>
        <p>ID: {user.utilisateurId}</p>
        <p>Email: {user.email}</p>
        <p>Téléphone: {user.telephone}</p>
        
          {userRole === "AdministrateurInfrastructure" && (
            <>
              <select
                className="roleSelector"
                onChange={(e) => setRole(user.utilisateurId, e.target.value)}
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
                  getRole(user.utilisateurId).then((role) => alert(`Role: ${role}`))
                }
              >
                <FontAwesomeIcon icon={faUserCheck} /> Voir le rôle
              </button>
            </>
          )}
          {userRole === "PDG" && (
            <>
              <button
                className="assignButton"
                onClick={() => assignerProjet(user.utilisateurId)}
              >
                <FontAwesomeIcon icon={faProjectDiagram} /> Assigner à un projet
              </button>
              <button
                className="viewProjectsButton"
                onClick={() => voirProjetsAssignes(user.utilisateurId)}
              >
                <FontAwesomeIcon icon={faProjectDiagram} /> Voir les projets assignés
              </button>
            </>
          )}
          {userRole === "AdministrateurInfrastructure" && (
            <>
              <button
                className="updateButton"
                onClick={() => updateUser(user)}
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
                        `http://localhost:3000/utilisateur/deleteUser/${user.utilisateurId}`,
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
                      setUsers(users.filter((u) => u.utilisateurId !== user.utilisateurId));
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;