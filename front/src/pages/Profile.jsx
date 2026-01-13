import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import AuthContext from "../contents/authContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user: authUser, handleLogoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (authUser && (!id || authUser.id === id)) {
      setUser(authUser);
      setLoading(false);
    } else if (id) {
      getUserProfile(id)
        .then((userDb) => {
          setUser(userDb);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, authUser]);

  const handleLogout = () => {
    handleLogoutUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning shadow-sm" role="alert">
          <h4 className="alert-heading">¡Ups! No has iniciado sesión</h4>
          <p>Necesitas identificarte para ver esta información.</p>
          <hr />
          <Link to="/login" className="btn btn-primary">Ir al Login</Link>
        </div>
      </div>
    );
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : "?";
  const isMyProfile = authUser && authUser.id === user.id;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            
            <div className="bg-primary p-4 text-center text-white" 
                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              
              <div 
                className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
                style={{ width: '100px', height: '100px', fontSize: '2.5rem', fontWeight: 'bold' }}
              >
                {userInitial}
              </div>
              
              <h3 className="mb-0 fw-bold">{user.email.split('@')[0]}</h3>
              <p className="opacity-75 mb-0">Usuario de la Biblioteca</p>
            </div>

            <div className="card-body p-4">
              <h5 className="text-muted mb-4 text-uppercase fs-6 fw-bold">Información de la cuenta</h5>
              
              <div className="mb-3">
                <label className="small text-muted fw-bold">Email</label>
                <div className="d-flex align-items-center p-3 bg-light rounded-3">
                  <i className="bi bi-envelope me-3 text-primary"></i>
                  <span className="fw-medium text-dark">{user.email}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="small text-muted fw-bold">ID de Usuario</label>
                <div className="d-flex align-items-center p-3 bg-light rounded-3">
                  <i className="bi bi-hash me-3 text-primary"></i>
                  <span className="fw-medium text-dark">#{user.id}</span>
                </div>
              </div>

              {isMyProfile && (
                <div className="d-grid gap-2 mt-5">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-lg">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;