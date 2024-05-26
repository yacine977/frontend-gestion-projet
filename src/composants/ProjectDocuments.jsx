import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDocuments() {
  const [documents, setDocuments] = useState([]);
  const { projetId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/document/projet/${projetId}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    };

    fetchData();
  }, [projetId]);

  return (
    <div>
      <h1>Documents du projet {projetId}</h1>
      {documents.map((document) => (
        <div key={document.id}>
          <h2>{document.nom}</h2>
          <p>Type: {document.type}</p>
          <p>Chemin d'accès: {document.cheminAcces}</p>
          <p>ID de l'utilisateur: {document.utilisateurId}</p>
          <p>ID du projet: {document.projetId}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectDocuments;