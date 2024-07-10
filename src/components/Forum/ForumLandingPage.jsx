import { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";
import { BLOQUEADO } from "../../constants";
import axios from 'axios';
import { UserContext } from "../../context/UserContext";

export const ForumLandingPage = () => {
  const { user } = useContext(UserContext);
  const [nombreAgencia, setNombreAgencia] = useState(BLOQUEADO);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/users/${user._id}`);
        const { selectedAgency } = response.data;
        setNombreAgencia(selectedAgency || BLOQUEADO);
      } catch (error) {
        console.error("Error fetching agency:", error);
      }
    };
    
    if (user) {
      fetchAgency();
    }
  }, [user]);
  
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

