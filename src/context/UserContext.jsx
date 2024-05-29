import { createContext, useState, useEffect } from "react";
import axios from "axios"; 
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const addUser = async (username, password, name, email, occupation, photo) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                username,
                password,
                name,
                email,
                occupation,
                photo
            });
            const userData = response.data;
            setUser(userData);
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error("Registration failed", error);
        }
    };
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            console.log('Login response:', response.data); // Para depuración
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

    const updateUserPhoto = (newPhoto) => {
        if (user) {
            const updatedUser = { ...user, photo: newPhoto };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    return (
        <UserContext.Provider value={{ user, addUser, loginUser, removeUser, isLoggedIn, updateUserPhoto, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
