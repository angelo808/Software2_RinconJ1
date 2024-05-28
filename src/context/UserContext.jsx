import { createContext, useState } from "react";
import axios from "axios"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const removeUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    const updateUserPhoto = (newPhoto) => {
        if (user) {
            setUser({ ...user, photo: newPhoto });
        }
    };

    return (
        <UserContext.Provider value={{ user, addUser, removeUser, isLoggedIn, updateUserPhoto }}>
            {children}
        </UserContext.Provider>
    );
};
