import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EL RINCÓN DEL J1
        </Typography>
        <Button color="inherit">MI PERFIL</Button>
        <Button color="inherit">MIS ETAPAS</Button>
        <Button color="inherit">MIS FOROS</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
