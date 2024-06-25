import React, { useState, useEffect } from "react";
import "../styles/ListeDocuments.css";
import { Link } from "react-router-dom";

function ListeDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    recupererDocuments();
  }, []);

  const recupererDocuments = async () => {
    try {
      const response = await fetch("http://localhost:3000/document");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const supprimerDocument = async (documentId) => {
    console.log("Attempting to delete document with id:", documentId); // Log the documentId
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
        recupererDocuments();
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    }
  };
  

  return (
    <div className="documents-container">
      <h1 className="documents-title">Liste des documents</h1>
      {documents.map((doc) => (
        <div key={doc.documentId} className="document-item">
          <h2 className="document-title">{doc.nom}</h2>
          <p className="document-info">Type: {doc.type}</p>
          <p className="document-info">Chemin d'accès: {doc.cheminAcces}</p>
          <p className="document-info">ID de l'utilisateur: {doc.utilisateurId}</p>
          <p className="document-info">ID du projet: {doc.projetId}</p>
          <button onClick={() => supprimerDocument(doc.documentId)}>Supprimer</button>
          <Link to={`/UpdateDocumentForm/${doc.documentId}`} className="document-update-button">
            Modifier
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ListeDocuments;
