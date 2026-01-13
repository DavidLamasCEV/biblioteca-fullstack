import React, { createContext, useState, useEffect} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const storageTheme = window.localStorage.getItem('user_theme')
    const [theme, setTheme] = useState(storageTheme || 'Light');

    const handleChangeTheme = () => {
        setTheme((actualTheme) => {
            const newTheme = actualTheme === 'Light' ? 'Dark' : 'Light';
            window.localStorage.setItem('user_theme', actualTheme === 'Light' ? 'Dark' : 'Light')
            return actualTheme === 'Light' ? 'Dark' : 'Light'
        })
    }

    useEffect(() => {
        // Esto pone data-bs-theme="dark" o "light" en el body (Compatible con Bootstrap 5.3+)
        document.body.setAttribute('data-bs-theme', theme.toLowerCase()); 
        
        // O si prefieres clases clásicas:
        // document.body.className = theme; 
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
            {children}
        </ThemeContext.Provider>
    );  
}

export default ThemeContext;