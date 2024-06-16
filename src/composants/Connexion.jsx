import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase"; // Assurez-vous que le chemin d'accès à votre configuration Firebase est correct.

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connexion = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user.getIdTokenResult().then((idTokenResult) => {
          localStorage.setItem("token", idTokenResult.token);
          localStorage.setItem("user", JSON.stringify(userCredential.user));
          localStorage.setItem("role", idTokenResult.claims.role);
          localStorage.setItem("uid", userCredential.user.uid); // Stocke l'UID de l'utilisateur
          console.log("Connexion réussie");
          alert("Connexion réussie");
          window.location.pathname = "/"; // Redirige l'utilisateur vers la page d'accueil.
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion", error);
        alert("Erreur lors de la connexion: " + error.message);
      });
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    fontSize: "1.2em",
    color: "#333",
    marginBottom: "10px",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    fontSize: "1em",
    border: "none",
    borderBottom: "2px solid #333",
    backgroundColor: "transparent",
    outline: "none",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#FF4500",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    marginTop: "20px",
  };

  return (
    <form onSubmit={connexion} style={formStyle}>
      <label style={labelStyle}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Mot de passe:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <button type="submit" style={buttonStyle}>
        Se connecter
      </button>
    </form>
  );
}

export default Connexion;