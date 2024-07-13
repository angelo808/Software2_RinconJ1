import { createContext, useState, useEffect } from "react";
import axiosBase from "../axios/axiosBase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const addUser = async (userData) => {
    try {
      const response = await axiosBase.post("/users", userData);
      const createdUser = response.data;
      setUser(createdUser);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(createdUser));
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axiosBase.post("/users/login", { username, password });
      const userData = response.data;
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const updateUserEntrevista = async (userId) => {
    try {
        await axiosBase.put(`http://localhost:5001/api/users/update-entrevista/${userId}`);
        setUser(prevUser => ({ ...prevUser, entrevista: true }));
        localStorage.setItem('user', JSON.stringify({ ...user, entrevista: true }));
    } catch (error) {
        console.error("Failed to update entrevista", error);
    }
};

  const removeUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const updateUserPhoto = (newPhoto) => {
    if (user) {
      const updatedUser = { ...user, photo: newPhoto };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const updateUserAgency = async (userId, agency) => {
    if (user) {
      try {
        const response = await axiosBase.put(`/users/update-agency`, { userId, selectedAgency: agency });
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update agency:", error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, addUser, loginUser, removeUser, isLoggedIn, updateUserPhoto, updateUserAgency, updateUserEntrevista }}>
      {children}
    </UserContext.Provider>
  );
};