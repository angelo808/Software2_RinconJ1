import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";
import { BLOQUEADO } from "../../constants";

export const ForumLandingPage = () => {
  const [nombreAgencia, setNombreAgencia] = useState(BLOQUEADO);

  useEffect(() => {
    const nombreAgencia = localStorage.getItem("nombreAgencia") || BLOQUEADO;
    setNombreAgencia(nombreAgencia);
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
    </div>
  );
};

