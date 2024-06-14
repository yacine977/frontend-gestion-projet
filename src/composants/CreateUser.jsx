import React, { useState } from "react";
import styles from "../styles/CreateUser.module.css"; // Importation des styles spécifiques au composant

// Composant pour créer un nouvel utilisateur
function CreateUser() {
  // État pour stocker l'email, le mot de passe et les messages de l'utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          body: JSON.stringify({ email, password }), // Corps de la requête avec email et mot de passe
        }
      );

      if (!response.ok) {
        throw new Error("La création de l’utilisateur a échoué");
      }

      const user = await response.json(); // Récupère la réponse du serveur
      setMessage(`Utilisateur créé : ${user.email}`); // Affiche un message de succès
      setEmail(""); // Réinitialise l'email
      setPassword(""); // Réinitialise le mot de passe
    } catch (error) {
      setMessage(`Erreur : ${error.message}`); // Affiche un message d'erreur
      setEmail(""); // Optionnel : Réinitialise l'email même en cas d'erreur
      setPassword(""); // Optionnel : Réinitialise le mot de passe même en cas d'erreur
    }
  };

  // Rendu du composant
  return (
    <div className={styles.container}>
      <h2>Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Met à jour l'email à chaque changement
            required
            className={styles.input}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Met à jour le mot de passe à chaque changement
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Créer
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>} // Affiche un
      message de retour
    </div>
  );
}

export default CreateUser; // Exporte le composant pour une utilisation ailleurs
