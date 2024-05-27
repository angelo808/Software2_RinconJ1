import { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";

import { BLOQUEADO } from "../../constants";

export const ForumLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nombreAgencia, setNombreAgencia] = useState(BLOQUEADO);
  const [nombreEmpleador, setNombreEmpleador] = useState(BLOQUEADO);
  const [nombreEmbajada, setNombreEmbajada] = useState(BLOQUEADO);

  useEffect(() => {
    // setIsLoading(true);
    const nombreAgencia = localStorage.getItem("nombreAgencia") || BLOQUEADO;
    setNombreAgencia(nombreAgencia);
    // setIsLoading(false);
  }, []);
  return (
    <div className="mx-auto w-5/6">
      <ForumOption
        name={nombreAgencia}
        buttonTitle={`FORO AGENCIA: ${nombreAgencia}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu misma Agencia!"
        }
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={nombreEmpleador}
        buttonTitle={`FORO EMPLEADOR: ${nombreEmpleador}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu mismo Empleador!"
        }
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={nombreEmbajada}
        buttonTitle={`FORO EMBAJADA: ${nombreEmbajada}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan en el mismo mes de tu cita!"
        }
      />
    </div>
  );
};
