import React, { useContext, useState } from "react";
import logo from "../assets/logo.PNG";
import { UserContext } from "../context/UserContext";
import GuestLinks from "./GuestLinks";
import UserInfo from "./UserInfo";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { user, isLoggedIn, removeUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleProfile = () => {
    navigate("/perfil");
  };

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="logo" style={{ width: 48, height: 48 }} />
          <Typography variant="h6" component={Link} to={isLoggedIn ? "/inicio" : "/"} sx={{ textDecoration: 'none', color: 'inherit', mx: 2 }}>
            EL RINCÓN DEL J1
          </Typography>
        </Box>
        <Box ml="auto" display="flex" alignItems="center">
          {!isLoggedIn ? (
            <GuestLinks />
          ) : (
            <UserInfo
              user={user}
              isInfoVisible={isInfoVisible}
              toggleInfoVisibility={toggleInfoVisibility}
              handleProfile={handleProfile}
              handleLogout={handleLogout}
            />
          )}
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
