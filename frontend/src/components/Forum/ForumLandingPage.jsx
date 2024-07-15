import React, { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export const ForumLandingPage = () => {
  const { user } = useContext(UserContext);
  const [agency, setAgency] = useState('');
  const [employer, setEmployer] = useState('');

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
        name={agency}
        buttonTitle={`FORO AGENCIA: ${agency}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu misma Agencia!"
        }
        type={'AGENCY'}
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={employer}
        buttonTitle={`FORO EMPLEADOR: ${employer}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu mismo Empleador!"
        }
        type={'EMPLOYER'}
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={'EMBAJADA'}
        buttonTitle={`FORO EMBAJADA`}
        descTitle={
          "¡Aquí podrás ver toda la información relacionada a la embajada!"
        }
        type={'EMBASSY'}
      />
    </div>
  );
};
export default ForumLandingPage;


