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

    const addUser = async (username, password, name, email, occupation, photo, selectedAgency) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users', {
                username,
                password,
                name,
                email,
                occupation,
                photo,
                selectedAgency
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
            const response = await axios.post('http://localhost:5001/api/users/login', { username, password });
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
    const updateUserAgency = async (userId,agency) => {
        if (user) {
            try {
                const response = await axios.put('http://localhost:5001/api/users/update-agency', { userId, selectedAgency: agency });
                const updatedUser = response.data;
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } catch (error) {
                console.error("Failed to update agency", error);
            }
        }
    };

    return (
        <UserContext.Provider value={{ user, addUser, loginUser, removeUser, isLoggedIn, updateUserPhoto, setUser, updateUserAgency }}>
            {children}
        </UserContext.Provider>
    );
};
