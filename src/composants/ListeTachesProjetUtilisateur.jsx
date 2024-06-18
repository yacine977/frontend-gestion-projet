import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Assurez-vous d'installer react-bootstrap
import "../styles/ListeDesTaches.css"; // Étape 1: Importer le CSS

const ListeTachesProjetUtilisateur = () => {
  const [taches, setTaches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { projetId } = useParams();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchTaches = async () => {
      if (uid && projetId) {
        try {
          const response = await fetch(
            `http://localhost:3000/tache/par-utilisateur/${uid}/projet/${projetId}`
          );
          if (!response.ok) {
            throw new Error("Erreur réseau");
          }
          const data = await response.json();
          setTaches(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des tâches", error);
        }
      } else {
        console.log(
          "UID ou projetId est undefined, vérifiez le localStorage et l'URL."
        );
      }
    };

    fetchTaches();
  }, [uid, projetId]);

  const terminerTache = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tache/terminer/${id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur réseau lors de la mise à jour de la tâche");
      }
      setTaches(
        taches.map((tache) =>
          tache.id === id ? { ...tache, statut: "Terminée" } : tache
        )
      );
      setShowModal(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Liste des Tâches pour le Projet {projetId}</h2>{" "}
      <ul>
        {taches.map((tache) => (
          <li key={tache.id} className="tache">
            <button onClick={() => terminerTache(tache.id)}>
              Terminer la tâche
            </button>
            <strong>ID de la tâche:</strong> {tache.id}
            <br />
            <strong>Description:</strong> {tache.description}
            <br />
            <strong>Priorité:</strong> {tache.priorite}
            <br />
            <strong>Statut:</strong> {tache.statut}
            <br />
            <strong>Date de début:</strong> {tache.dateDebut}
            <br />
            <strong>Date de fin prévue:</strong> {tache.dateFinPrevu}
            <br />
            <strong>Date de fin réelle:</strong>{" "}
            {tache.dateFinReel ? tache.dateFinReel : "Non spécifiée"}
            <br />
            <strong>ID du projet:</strong> {tache.projetId}
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tâche exécutée avec succès</Modal.Title>
        </Modal.Header>
        <Modal.Body>La tâche a été marquée comme terminée.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListeTachesProjetUtilisateur;
