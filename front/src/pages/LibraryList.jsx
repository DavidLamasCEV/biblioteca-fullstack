import { useEffect, useState } from 'react';
import { getLibraries } from '../services/libraryService';
import { Link } from 'react-router-dom';

const LibraryList = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLibraries()
      .then((data) => {
        setLibraries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Librerías Disponibles</h1>
        <Link to="/add-library" className="btn btn-primary">
          + Añadir Librería
        </Link>
      </div>

      <div className="row">
        {libraries.length === 0 ? (
          <p>No hay librerías registradas aún.</p>
        ) : (
          libraries.map((lib) => (
            <div key={lib._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{lib.name}</h5>
                  <p className="card-text text-muted">📍 {lib.location}</p>
                  <p className="card-text"><small>Fundada en: {lib.established}</small></p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LibraryList;