import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ForumOption = ({ buttonTitle, name, descTitle, type }) => {
  const navigate = useNavigate();

  return (
    <div>
      {
        type == 'AGENCY' ? 
        <div className="grid grid-cols-2 py-6 text-center font-bold">
          <div className="mx-auto">
            <Button
              variant="contained"
              color={name === "BLOQUEADO" ? "primary" : "secondary"}
              disabled={name === "BLOQUEADO"}
              onClick={() => navigate("/mis-foros-agencia")}
            >
            <p className="uppercase">{buttonTitle}</p>
            </Button>
          </div>
          <div>{descTitle}</div>
        </div>
        : 
        <div className="grid grid-cols-2 py-6 text-center font-bold">
          <div className="mx-auto">
            <Button
              variant="contained"
              color={name === "BLOQUEADO" ? "primary" : "secondary"}
              disabled={name === "BLOQUEADO"}
              onClick={() => navigate("/mis-foros-empleador")}
            >
            <p className="uppercase">{buttonTitle}</p>
            </Button>
          </div>
          <div>{descTitle}</div>
        </div>
      }
      
    </div>
    
  );
};

export default ForumOption;

