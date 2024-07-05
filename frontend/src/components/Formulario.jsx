import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Formulario = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, loginUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    await loginUser(data.userAccount, data.userPassword);
    reset();
  };

  if (user !== null) {
    return <Navigate to="/inicio" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="mb-4">
        <Typography variant="h6" gutterBottom>
          Usuario
        </Typography>
        <TextField
          fullWidth
          type="text"
          id="userAccount"
          {...register("userAccount")}
          variant="outlined"
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div className="mb-6">
        <Typography variant="h6" gutterBottom>
          Contraseña
        </Typography>
        <TextField
          fullWidth
          type="password"
          id="userPassword"
          {...register("userPassword")}
          variant="outlined"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Iniciar sesión
        </Button>
        <Link
          to="/"
          className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  userAccount: PropTypes.string,
  userPassword: PropTypes.string,
};

export default Formulario;

