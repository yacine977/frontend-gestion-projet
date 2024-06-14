import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";

function TacheCard({ tache, onAssign, onDelete }) { // Ajout de onDelete dans les props
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{tache.nom}</Typography>
        <Typography color="text.secondary">{tache.description}</Typography>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Link
              to={`/modifier-tache/${tache.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                color="primary"
              >
                Modifier
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => onDelete(tache.id)}
            >
              Supprimer
            </Button>
          </Grid> {/* Correction de la fermeture de la balise Grid ici */}
          <Grid item>
            <Button
              startIcon={<AssignmentIcon />}
              variant="contained"
              color="secondary"
              onClick={() => onAssign(tache.id)}
            >
              Assigner
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function TachesProjet() {
  const [taches, setTaches] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [afficherUtilisateurs, setAfficherUtilisateurs] = useState(false);
  const { projetId } = useParams();
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState("");
  const onDelete = (id) => {
    setTaches(currentTaches => currentTaches.filter(tache => tache.id !== id));
  };

  useEffect(() => {
    fetch(`http://localhost:3000/tache/projet/${projetId}`)
      .then((response) => response.json())
      .then((data) => setTaches(data))
      .catch((error) => console.error("Erreur:", error));
  }, [projetId]);

  const fetchUtilisateurs = () => {
    fetch(`http://localhost:3000/projet/${projetId}/utilisateurs`)
      .then((response) => response.json())
      .then((data) => {
        setUtilisateurs(data);
        setAfficherUtilisateurs(true);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs:", error)
      );
  };

  const assignerTache = (tacheId) => {
    fetch("http://localhost:3000/tache/assigner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tacheId, uid: utilisateurSelectionne }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tâche assignée:", data);
        alert("Tâche assignée avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de l'assignation:", error);
        alert("Erreur lors de l'assignation de la tâche");
      });
  };

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Tâches pour ce projet :
      </Typography>
      <Button variant="contained" onClick={fetchUtilisateurs}>
        Afficher les utilisateurs
      </Button>
      {afficherUtilisateurs && utilisateurs.length > 0 && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="utilisateur-select-label">
            Sélectionner un utilisateur
          </InputLabel>
          <Select
            labelId="utilisateur-select-label"
            id="utilisateur-select"
            value={utilisateurSelectionne}
            label="Sélectionner un utilisateur"
            onChange={(e) => setUtilisateurSelectionne(e.target.value)}
          >
            {utilisateurs.map((utilisateur, index) => (
              <MenuItem key={index} value={utilisateur.uid}>
                {utilisateur.uid}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="outlined"
            onClick={() => setAfficherUtilisateurs(false)}
            style={{ marginTop: "10px" }}
          >
            Masquer les utilisateurs
          </Button>
        </FormControl>
      )}
      <Grid container spacing={2}>
        {taches.map((tache, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TacheCard tache={tache} onAssign={assignerTache} onDelete={onDelete} /> {/* Passer onDelete ici */}
          </Grid>
        ))}
      </Grid>
      {taches.length === 0 && (
        <Typography>Pas de tâches pour ce projet pour le moment...</Typography>
      )}
    </div>
  );
}

export default TachesProjet;