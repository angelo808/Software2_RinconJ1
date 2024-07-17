import React, { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export const ForumLandingPage = () => {
  const { user } = useContext(UserContext);
  const [agency, setAgency] = useState(null);
  const [employer, setEmployer] = useState(null);

  useEffect(()=> {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:5001/api/users/${user._id}`)
    console.log(response.data)
    setAgency(response.data.selectedAgency)
    setEmployer(response.data.employer)
  }

  return (
    <div className="mx-auto w-5/6">
      <ForumOption
        name={!agency  ? 'BLOQUEADO' : agency}
        buttonTitle={agency ? `FORO AGENCIA: ${agency}` : 'FORO AGENCIA'}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu misma Agencia!"
        }
        type={'AGENCY'}
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={!employer  ? 'BLOQUEADO' : employer}
        buttonTitle={employer ? `FORO EMPLEADOR: ${employer}` : 'FORO EMPLEADOR'}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu mismo Empleador!"
        }
        type={'EMPLOYER'}
        disabled={employer  ? false : true}
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={'EMBAJADA'}
        buttonTitle={`FORO EMBAJADA`}
        descTitle={
          "¡Aquí podrás ver toda la información relacionada a la embajada!"
        }
        type={'EMBASSY'}
        disabled={false}
      />
    </div>
  );
};
export default ForumLandingPage;


