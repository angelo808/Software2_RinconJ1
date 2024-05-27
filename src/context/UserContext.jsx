import { createContext, useState } from "react";

export const UserContext = createContext();//Crea un contexto de usuario

export const UserProvider = ({children}) => {//Provee el contexto de usuario a los componentes hijos
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const addUser = (id, nombre, correo, especialidad, foto) => {//Agrega un usuario al estado
        setUser({id, nombre, correo, especialidad, foto});
        setIsLoggedIn(true);
        console.log(isLoggedIn);
    }
    const removeUser = () => {//Elimina un usuario del estado
      setUser(null);
      setIsLoggedIn(false);
      console.log(user);
      console.log(isLoggedIn);
    };

    const updateUserPhoto = (newPhoto) => {//Actualiza la foto de un usuario
      if (user) {
        setUser({...user, foto: newPhoto});
      }
    };

  return (
    <UserContext.Provider value={{user, addUser, removeUser, isLoggedIn, updateUserPhoto  }}>
        {children}
    </UserContext.Provider>
  )
}