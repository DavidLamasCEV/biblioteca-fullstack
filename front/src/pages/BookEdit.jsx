import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/books.service';

const BookEdit = () => {
  const [book, setBook] = useState({ title: '', author: '', year: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(id)
      .then((response) => {
        setBook(response);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(id, book)
      .then(() => {
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error('Error updating book:', error);
      });
  };

  return (
    <div className="book-edit-container">
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Año</label>
          <input
            type="number"
            id="year"
            name="year"
            value={book.year}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default BookEdit;