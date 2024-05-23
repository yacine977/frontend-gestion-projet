import React, { useState, useEffect } from 'react';
import '../styles/ListeDocuments.css';

function ListeDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const recupererDocuments = async () => {
      const response = await fetch('http://localhost:3000/document');
      const data = await response.json();
      setDocuments(data);
    };

    recupererDocuments();
  }, []);

  return (
    <div className="documents-container">
    <h1 className="documents-title">Liste des documents</h1>
    {documents.map((doc, index) => (
      <div key={index} className="document-item">
        <h2 className="document-title">{doc.nom}</h2>
        <p className="document-info">Type: {doc.type}</p>
        <p className="document-info">Chemin d'accès: {doc.cheminAcces}</p>
        <p className="document-info">ID de l'utilisateur: {doc.utilisateurId}</p>
      </div>
    ))}
  </div>
  );
}

export default ListeDocuments;