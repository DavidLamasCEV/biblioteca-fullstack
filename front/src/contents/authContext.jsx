import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const storedUser = window.localStorage.getItem('user_session');
    const [user, setUser] = useState(storedUser || null);

    const handleSetUser = (loggedUser) => {
        setUser(loggedUser);
        window.localStorage.setItem('user_session', JSON.stringify(loggedUser));
    };
    
    const handleLogoutUser = () => {
        setUser(null);
        window.localStorage.removeItem('user_session');
    };

    return (
        <AuthContext.Provider value={{ user, handleSetUser, handleLogoutUser }}>
            {children}
        </AuthContext.Provider>
    );  
};

export default AuthContext;