import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserInfo = ({
  user,
  isInfoVisible,
  toggleInfoVisibility,
  handleProfile,
  handleLogout,
  handleAdmin
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    toggleInfoVisibility();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    toggleInfoVisibility();
  };

  return (
    <Box display="flex" alignItems="center">
      <Button component={Link} to="/mis-etapas" color="inherit">
        Mis etapas
      </Button>
      <Button component={Link} to="/mis-foros" color="inherit">
        Mis foros
      </Button>
      <Button component={Link} to="/mi-calendario" color="inherit">
        Mi Calendario
      </Button>
      <IconButton onClick={handleMenuOpen} color="inherit">
        {user.photo ? (
          <Avatar alt={user.name} src={user.photo} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isInfoVisible}
        onClose={handleMenuClose}
        keepMounted
      >
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Avatar
            alt={user.name}
            src={user.photo || "https://via.placeholder.com/600"}
            sx={{ width: 64, height: 64, mb: 2 }}
          />
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2">{user.occupation}</Typography>
          <Button onClick={handleProfile} fullWidth sx={{ mt: 1, mb: 1 }}>
            Ver Perfil
          </Button>
          {
            (user?.isAdmin !== undefined && user.isAdmin === true) && <Button onClick={handleAdmin} fullWidth sx={{ mt: 1, mb: 1 }}>
              Panel Admin
            </Button>
          }
          
          <Button onClick={handleLogout} fullWidth color="error">
            Cerrar sesión
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default UserInfo;

