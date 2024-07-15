import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from "@mui/material";

const RegistrationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const onSubmitRegistro = async (data) => {
    const response = await addUser({
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        occupation: data.occupation
      }
    );
    
    if (response) {
      setError(response)
    } else {
      reset();
      navigate("/iniciar-sesion");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmitRegistro)} sx={{ mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro de Usuario
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          label="Nombre"
          {...register("name", { required: true })}
        />
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Correo electrónico"
          type="email"
          {...register("email", { required: true })}
        />
        <TextField
          fullWidth
          margin="normal"
          id="occupation"
          label="Profesión"
          {...register("occupation", { required: true })}
        />
        <TextField
          fullWidth
          margin="normal"
          id="username"
          label="Usuario"
          {...register("username", { required: true })}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Contraseña"
          type="password"
          {...register("password", { required: true })}
        />
        {
          error ? 
          <Alert severity="error">{error}</Alert> :
          <></>
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrarse
        </Button>
        <Box textAlign="center">
          <Link to="/iniciar-sesion">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;


