import React, { useEffect, useState } from "react";
import "../styles/UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCheck,
  faProjectDiagram,faTrashAlt,faUserEdit
} from "@fortawesome/free-solid-svg-icons";

function UserList() {
  const [users, setUsers] = useState([]);

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

  const assignUsersToProject = async (projectId, uid) => {
    try {
      const response = await fetch(
        `http://localhost:3000/projet/${projectId}/assigner`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ uid }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erreur lors de l'assignation des utilisateurs au projet :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const fetchUserProjects = async (uid) => {
    try {
      const response = await fetch(`http://localhost:3000/projet/par-utilisateur/${uid}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const projects = await response.json();
      return projects.map(project => project.nom).join(', ');
    } catch (error) {
      console.error("Erreur lors de la récupération des projets de l'utilisateur :", error);
      return "Erreur lors de la récupération des projets";
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
          <button
            className="assignButton"
            onClick={() => {
              const projectId = prompt("Entrez l'ID du projet");
              if (projectId) {
                assignUsersToProject(projectId, user.uid);
              }
            }}>
            <FontAwesomeIcon icon={faProjectDiagram} /> Assigner au projet
          </button>
          <button className="buttonMarginRight" onClick={() => fetchUserProjects(user.uid).then(projects => alert(`Projets: ${projects}`))}>
          <FontAwesomeIcon icon={faProjectDiagram} /> Voir les projets
          </button>
          <button
  className="updateButton"
  onClick={async () => {
    const email = prompt("Entrez le nouvel email de l'utilisateur:");
    const password = prompt("Entrez le nouveau mot de passe de l'utilisateur:");
    if (email && password) {
      try {
        const response = await fetch(`http://localhost:3000/utilisateur/updateUser/${user.uid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
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
  }}
>
  <FontAwesomeIcon icon={faUserEdit} /> Mettre à jour
</button>
          <button
  className="deleteButton"
  onClick={async () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3000/utilisateur/deleteUser/${user.uid}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        alert(data.message);
        // Actualiser la liste des utilisateurs après la suppression
        setUsers(users.filter((u) => u.uid !== user.uid));
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
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