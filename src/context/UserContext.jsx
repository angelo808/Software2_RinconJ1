import { createContext, useState } from "react";
import axios from "axios"; 
export const UserContext = createContext();//Crea un contexto de usuario

export const UserProvider = ({children}) => {//Provee el contexto de usuario a los componentes hijos
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const addUser = async (username, password) => {
      try {
          const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
          const userData = response.data;
          setUser(userData);
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
          console.error("Login failed", error);
      }
  };
    const removeUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
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