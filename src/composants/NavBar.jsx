import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Mon Application
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">Accueil</Button>
        <Button color="inherit" component={RouterLink} to="/projets">Projets</Button>
        <Button color="inherit" component={RouterLink} to="/creer-projet">Créer un projet</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;