import React, { useState } from "react";
import styles from "../styles/CreateUser.module.css"; // Importation des styles spécifiques au composant

// Composant pour créer un nouvel utilisateur
function CreateUser() {
  // État pour stocker les informations de l'utilisateur
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    try {
      // Envoie une requête POST pour créer un utilisateur
      const response = await fetch(
        "http://localhost:3000/utilisateur/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nom, prenom, email, telephone, motDePasse }), // Corps de la requête avec les informations de l'utilisateur
        }
      );

      if (!response.ok) {
        throw new Error("La création de l’utilisateur a échoué");
      }

      const user = await response.json(); // Récupère la réponse du serveur
      setMessage(`Utilisateur créé : ${user.firebaseUser.email}`); // Affiche un message de succès
      // Réinitialise les champs
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setMotDePasse("");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`); // Affiche un message d'erreur
      // Optionnel : Réinitialise les champs même en cas d'erreur
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setMotDePasse("");
    }
  };

  // Rendu du composant
  return (
    <div className={styles.container}>
      <h2>Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Téléphone :</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Créer
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>} 
    </div>
  );
}

export default CreateUser; // Exporte le composant pour une utilisation ailleurs