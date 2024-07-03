import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../styles/ListeDocuments.css";

function ProjectDocuments() {
  const [documents, setDocuments] = useState([]);
  const { projetId } = useParams();

  // Déplacez fetchData ici pour qu'elle soit accessible dans useEffect et supprimerDocument
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/document/projet/${projetId}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des documents:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projetId]);

  const supprimerDocument = async (documentId) => {
    console.log("Attempting to delete document with id:", documentId);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
      try {
        const response = await fetch(`http://localhost:3000/document/${documentId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.message);
        fetchData(); // Maintenant fetchData est accessible ici
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    }
  };

  return (
    <div className="documents-container">
      <h1 className="documents-title">Documents du projet {projetId}</h1>
      {documents.map((document) => (
        <div className="document-item" key={document.id}>
          <h2 className="document-title">{document.nom}</h2>
          <p className="document-info">Type: {document.type}</p>
          <p className="document-info">Chemin d'accès: {document.cheminAcces}</p>
          {/*<p className="document-info">ID de l'utilisateur: {document.utilisateurId}</p> */}
          <p className="document-info">Créateur: {document.prenom} {document.nom}</p> {/* Ajouté */}

          {/* <p className="document-info">ID du projet: {document.projetId}</p> */}
          <button onClick={() => supprimerDocument(document.documentId)}>Supprimer</button>
          <Link to={`/UpdateDocumentForm/${document.documentId}`} className="document-update-button">
            Modifier
          </Link>
        </div>
      ))}
    </div>
  );
  
}

export default ProjectDocuments;