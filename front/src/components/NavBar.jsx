import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../contents/themeContext';
import AuthContext from '../contents/authContext';

const NavBar = () => {
  const { theme, handleChangeTheme } = useContext(ThemeContext);
  const { user, handleLogoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogoutUser();
    navigate('/login'); // Redirigir al login al cerrar sesión
  };

  // Helper para simplificar las clases de texto según el tema
  const textColorClass = `text-${theme === 'light' ? 'dark' : 'light'}`;

  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-${theme}`}>
        <div className="container-fluid">
          <Link className={`navbar-brand ${textColorClass}`} to="/">Biblioteca</Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto"> {/* me-auto empuja el botón de tema a la derecha */}
              
              {/* Enlaces Públicos (siempre visibles) */}
              <li className="nav-item">
                <Link to="/books" className={`nav-link ${textColorClass}`}>Libros</Link>
              </li>
              <li className="nav-item">
                <Link to="/libraries" className={`nav-link ${textColorClass}`}>Librerías</Link>
              </li>

              {/* Lógica Condicional: INVITADO vs LOGUEADO */}
              {!user ? (
                // Si NO hay usuario (Invitado)
                <>
                  <li className="nav-item">
                    <Link to="/register" className={`nav-link ${textColorClass}`}>Registro</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className={`nav-link ${textColorClass}`}>Login</Link>
                  </li>
                </>
              ) : (
                // Si SÍ hay usuario (Logueado)
                <>
                  <li className="nav-item">
                    <Link to={`/profile/${user.id}`} className={`nav-link ${textColorClass}`}>
                      Mi Perfil ({user.email})
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={onLogout} className={`btn nav-link ${textColorClass}`} style={{ border: 'none', background: 'transparent' }}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
            
            {/* Botón de Tema */}
            <div className="d-flex align-items-center">
              <button 
                className={`btn btn-sm btn-outline-${theme === 'light' ? 'dark' : 'light'}`} 
                onClick={handleChangeTheme}
              >
                Tema: {theme === 'light' ? 'Claro' : 'Oscuro'}
              </button>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;