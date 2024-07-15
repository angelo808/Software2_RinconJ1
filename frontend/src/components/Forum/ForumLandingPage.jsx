import React, { useState, useEffect, useContext } from "react";
import Divider from "@mui/material/Divider";
import { ForumOption } from "./ForumOption";
import { UserContext } from "../../context/UserContext";

export const ForumLandingPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="mx-auto w-5/6">
      <ForumOption
        name={user.selectedAgency}
        buttonTitle={`FORO AGENCIA: ${user.selectedAgency}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu misma Agencia!"
        }
        type={'AGENCY'}
      />
      <Divider sx={{ borderBottomWidth: 5 }} />
      <ForumOption
        name={user.employer}
        buttonTitle={`FORO EMPLEADOR: ${user.employer}`}
        descTitle={
          "¡Aquí podrás ver toda la información de aquellos que vayan a tu mismo Empleador!"
        }
        type={'EMPLOYER'}
      />
    </div>
  );
};
export default ForumLandingPage;


