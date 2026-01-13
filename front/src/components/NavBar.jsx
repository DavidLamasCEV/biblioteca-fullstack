import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../contents/themeContext';

const NavBar = () => {

  const { theme, handleChangeTheme } = useContext(ThemeContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary text-light">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/register" className="nav-link active" aria-current="page" href="#">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link active" aria-current="page" href="#">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/books" className="nav-link active" aria-current="page" href="#">Books</Link>
              </li>
              <li className="nav-item">
                <Link to="/libraries" className="nav-link active" aria-current="page" href="#">Libraries</Link>
              </li>
              <li className="nav-item">
                <Link to="/add-library" className="nav-link active" aria-current="page" href="#">Add Library</Link>
              </li>
              <div>
                <button id="switch-theme" onClick={handleChangeTheme}>
                  Change to: {theme === 'Light' ? ' Dark ' : ' Light '} Theme
                  </button>
                </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
