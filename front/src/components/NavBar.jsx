import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../contents/themeContext';

const NavBar = () => {
  const { theme, handleChangeTheme } = useContext(ThemeContext)

  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-${theme}`}>
        <div className="container-fluid">
          <a className={`navbar-brand text-${theme === 'light' ? 'dark' : 'light'}`} href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/register" className={`text-${theme === 'light' ? 'dark' : 'light'} nav-link active`} aria-current="page" href="#">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/books" className={`text-${theme === 'light' ? 'dark' : 'light'} nav-link active`} aria-current="page" href="#">Books</Link>
              </li>
            </ul>
          </div >
          <div>
            <button id="switch-theme" onClick={handleChangeTheme}>
              Change to: {theme === 'light' ? 'dark' : 'light'}
            </button>
          </div>
        </div >
      </nav >
    </div >
  );
};

export default NavBar;
