import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const addUser = (id, nombre, correo, especialidad) => {
        setUser({id, nombre, correo, especialidad})
    }

  return (
    <UserContext.Provider value={{user, addUser}}>
        {children}
    </UserContext.Provider>
  )
}