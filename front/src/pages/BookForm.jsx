import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/books.service';
import { getLibraries } from '../services/library.service'; // Necesitamos esto para el select
import AuthContext from '../contents/authContext'; // Para saber quién eres

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    library: '' // Aquí guardaremos el ID de la librería seleccionada
  });
  
  const [libraries, setLibraries] = useState([]); // Lista para el select
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Obtenemos tu usuario logueado

  // 1. Cargar las librerías al entrar en la página
  useEffect(() => {
    getLibraries()
      .then(data => setLibraries(data))
      .catch(err => console.error("Error cargando librerías", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Preparamos los datos finales
    const dataToSend = {
      ...formData,
      user: user.id // ¡AQUÍ VINCULAMOS AL USUARIO AUTOMÁTICAMENTE!
    };

    try {
      await createBook(dataToSend);
      navigate('/books'); // Volver al listado
    } catch (err) {
      setError("Error al crear el libro.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Publicar un Libro</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" name="title" className="form-control" required onChange={handleChange} />
          </div>

          {/* Autor */}
          <div className="mb-3">
            <label className="form-label">Autor</label>
            <input type="text" name="author" className="form-control" required onChange={handleChange} />
          </div>

          {/* Año */}
          <div className="mb-3">
            <label className="form-label">Año</label>
            <input type="number" name="year" className="form-control" onChange={handleChange} />
          </div>

          {/* SELECT DE LIBRERÍAS */}
          <div className="mb-4">
            <label className="form-label">¿En qué librería está?</label>
            <select 
              name="library" 
              className="form-select" 
              required 
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>Selecciona una librería...</option>
              {libraries.map(lib => (
                <option key={lib._id} value={lib._id}>
                  {lib.name} ({lib.location})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Guardando...' : 'Crear Libro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;