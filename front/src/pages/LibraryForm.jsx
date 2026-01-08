import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLibrary } from '../services/libraryService';

const LibraryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    established: ''
  });
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null);      // Estado para errores
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createLibrary(formData);
      navigate('/libraries'); // Si todo va bien, nos vamos
    } catch (err) {
      console.error(err);
      setError("Error al guardar la librería. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Esto se ejecuta SIEMPRE al terminar el try o el catch
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2 className="text-center mb-4">Añadir Nueva Librería</h2>
      
      {/* Mensaje de error si existe */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading} // Bloquea input si carga
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Año Fundación</label>
          <input
            type="number"
            className="form-control"
            name="established"
            value={formData.established}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Guardando...
            </span>
          ) : (
            'Guardar Librería'
          )}
        </button>
      </form>
    </div>
  );
};

export default LibraryForm;