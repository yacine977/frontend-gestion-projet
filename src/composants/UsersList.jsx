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

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {users.map((user) => (
        <div key={user.uid}>
          <h2>{user.displayName}</h2>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          {/* Affichez d'autres informations sur l'utilisateur si nécessaire */}
        </div>
      ))}
    </div>
  );
}

export default UserList;