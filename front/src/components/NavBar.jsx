import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
