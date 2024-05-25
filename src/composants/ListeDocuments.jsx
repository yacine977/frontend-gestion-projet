import React, { useState, useEffect } from 'react';
import '../styles/ListeDocuments.css';
import { Link } from 'react-router-dom';

function ListeDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    recupererDocuments();
  }, []);

  const recupererDocuments = async () => {
    const response = await fetch('http://localhost:3000/document');
    const data = await response.json();
    setDocuments(data);
  };
const supprimerDocument = async (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
    await fetch(`http://localhost:3000/document/${id}`, {
      method: 'DELETE',
    });
    recupererDocuments(); // Rafraîchir la liste après la suppression
  }
};





  return (
    <div className="documents-container">
      <h1 className="documents-title">Liste des documents</h1>
      {documents.map((doc, index) => (
        <div key={index} className="document-item">
          <h2 className="document-title">{doc.nom}</h2>
          <p className="document-info">Type: {doc.type}</p>
          <p className="document-info">Chemin d'accès: {doc.cheminAcces}</p>
          <p className="document-info">ID de l'utilisateur: {doc.utilisateurId}</p>
          <p className="document-info">ID du projet: {doc.projetId}</p>
          <button onClick={() => supprimerDocument(doc.id)} className="document-delete-button">Supprimer</button>
          <Link to={`/UpdateDocumentForm/${doc.id}`} className="document-update-button">Modifier</Link>
         
        </div>
      ))}
    </div>
  );
}

export default ListeDocuments;