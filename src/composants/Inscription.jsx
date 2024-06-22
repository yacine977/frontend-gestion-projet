import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/utilisateur/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, prenom, email, telephone, motDePasse }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’inscription');
      }

      const data = await response.json();
      console.log(data);
      setNom('');
      setPrenom('');
      setEmail('');
      setTelephone('');
      setMotDePasse('');

      alert('Inscription réussie!');
      navigate('/connexion');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required style={inputStyle} />
      <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" required style={inputStyle} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={inputStyle} />
      <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Téléphone" required style={inputStyle} />
      <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder="Mot de passe" required style={inputStyle} />
      <button type="submit" style={buttonStyle}>S'inscrire</button>
    </form>
  );
}

export default Inscription;