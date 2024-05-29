import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/utilisateur/allUsers') // Remplacez par l'URL de votre serveur
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch((error) => {
        console.error('Erreur : ', error);
      });
  }, []);

  const getRole = async (uid) => {
    const response = await fetch(`http://localhost:3000/utilisateur/getRole/${uid}`);
    const data = await response.json();
    return data.role;
  };

  const setRole = async (uid, role) => {
    const response = await fetch('http://localhost:3000/utilisateur/setRole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, role }),
    });
    const data = await response.json();
    alert(data.message);
  };
  

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {users.map((user) => (
        <div key={user.uid}>
          <h2>{user.displayName}</h2>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          <select onChange={(e) => setRole(user.uid, e.target.value)}>
            
            <option value=""> Definir un role </option>
            <option value="PDG">PDG</option>
            <option value="ChefDeProjet">Chef de projet</option>
            <option value="UtilisateurStandard">Utilisateur standard</option>
            <option value="AdministrateurInfrastructure">Administrateur d'infrastructure</option>
          </select>
          <button onClick={() => getRole(user.uid).then(role => alert(`Role: ${role}`))}>Voir le rôle</button>
          {/* Affichez d'autres informations sur l'utilisateur si nécessaire */}
        </div>
      ))}
    </div>
  );
}

export default UserList;