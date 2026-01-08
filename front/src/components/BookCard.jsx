import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ title, year, user, author, onDelete, id }) => {
  return (
    <div className="card">
      <div className="card-body">
        <button onClick={onDelete} id="delete-btn" className="btn btn-danger">DELETE</button>
        <Link to={`/books/${id}/edit`} className="btn btn-warning ms-1">EDITAR</Link>
        <Link to={`/books/${id}`} className="btn btn-primary ms-1">VER</Link> 
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{author} - {year}</p>
        <p className="card-user">Añadido por: {user?.email}</p>
      </div>
    </div>
  );
};

export default BookCard;
