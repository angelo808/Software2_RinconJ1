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
      return error.response.data.error
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axiosBase.post("/users/login", { username, password });
      let userData = response.data;
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const updateUserEntrevista = async (userId) => {
    try {
        const response = await axiosBase.put(`http://localhost:5001/api/users/update-entrevista/${userId}`);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
        console.error("Failed to update entrevista", error);
    }
  };

  const updateUserDsTest = async (userId) => {
    try {
        const response = await axiosBase.put(`http://localhost:5001/api/users/update-dstest/${userId}`);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
        console.error("Failed to update entrevista", error);
    }
  };

  const updateUserProfile = async (userId, name, email, occupation) => {
    try {
        await axiosBase.put(`http://localhost:5001/api/users/update-profile/${userId}`,{name, email, occupation});
        setUser(prevUser => ({ ...prevUser, name: name, email: email, occupation: occupation }));
        localStorage.setItem('user', JSON.stringify({ ...user, name: name, email: email, occupation: occupation }));
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

  const updateUser = (newUser) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(newUser));
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
    <UserContext.Provider value={{ user, addUser, loginUser, removeUser, isLoggedIn, updateUserPhoto, updateUserAgency, updateUserEntrevista, updateUserProfile, updateUser, updateUserDsTest }}>
      {children}
    </UserContext.Provider>
  );
};