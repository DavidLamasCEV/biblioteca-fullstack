import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    // LEER: Intentamos leer y convertir el texto a objeto JSON
    const storedUser = window.localStorage.getItem('user_session');
    let initialUser = null;

    try {
        initialUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        // Por si alguien manipula el localStorage manualmente y lo rompe
        initialUser = null; 
        window.localStorage.removeItem('user_session');
    }

    const [user, setUser] = useState(initialUser);

    const handleSetUser = (loggedUser) => {
        setUser(loggedUser);
        // GUARDAR: Convertimos el objeto a texto
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