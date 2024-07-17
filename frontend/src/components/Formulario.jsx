import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TextField, Button, Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";

const Formulario = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, loginUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const response = await loginUser(data.userAccount, data.userPassword);

    if (response) {
      setError(response)
    } else {
      reset();
    }
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
      {
        error ? 
        <Alert severity="error">{error}</Alert> :
        <></>
      }

      <div className="flex items-center justify-between mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Iniciar sesión
        </Button>
        {/* <Link
          to="/"
          className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
        >
          ¿Has olvidado tu contraseña?
        </Link> */}
      </div>
    </form>
  );
};

Formulario.propTypes = {
  userAccount: PropTypes.string,
  userPassword: PropTypes.string,
};

export default Formulario;

