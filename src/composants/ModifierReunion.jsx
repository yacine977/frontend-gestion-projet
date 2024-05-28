import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ModifierReunion() {
  const { id } = useParams();
  const [sujet, setSujet] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [projetId, setProjetId] = useState('');
  const [createurId, setCreateurId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/reunion/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSujet(data.sujet);
        setDateTime(formatDateTime(data.dateTime));
        setProjetId(data.projetId);
        setCreateurId(data.createurId);
      } else {
        throw new Error('Erreur lors du chargement des données de la réunion');
      }
    };

    fetchData();
  }, [id]);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reunion = {
        sujet: sujet,
        dateTime: dateTime,
        projetId: projetId,
        createurId: createurId
      };

    

    const response = await fetch(`http://localhost:3000/reunion/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reunion),
    });

    if (response.ok) {
      alert('Réunion modifiée avec succès');
      setSujet('');
        setDateTime('');
        setProjetId('');
        setCreateurId('');
        
    } else {
      alert('Erreur lors de la modification de la réunion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sujet:
        <input type="text" value={sujet} onChange={(e) => setSujet(e.target.value)} />
      </label>
      <label>
        Date et heure:
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      </label>
      <label>
        ID du projet:
        <input type="text" value={projetId} onChange={(e) => setProjetId(e.target.value)} />
      </label>
      <label>
        ID du créateur:
        <input type="text" value={createurId} onChange={(e) => setCreateurId(e.target.value)} />
      </label>
      <button type="submit">Modifier la réunion</button>
    </form>
  );
}

export default ModifierReunion;