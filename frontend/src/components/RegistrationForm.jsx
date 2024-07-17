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
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
    });

    if (response) {
      setError(response);
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
          {...register("name", { required: "El campo Nombre es obligatorio" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Correo electrónico"
          type="email"
          {...register("email", { required: "El campo Correo electrónico es obligatorio" })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          id="occupation"
          label="Profesión"
          {...register("occupation", { required: "El campo Profesión es obligatorio" })}
          error={!!errors.occupation}
          helperText={errors.occupation ? errors.occupation.message : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          id="username"
          label="Usuario"
          {...register("username", { required: "El campo Usuario es obligatorio" })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Contraseña"
          type="password"
          {...register("password", { required: "El campo Contraseña es obligatorio" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
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
