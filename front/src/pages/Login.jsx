import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/userService";
import AuthContext from "../contents/authContext"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { handleSetUser } = useContext(AuthContext); // Usamos la función de tu contexto

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(userInfo)
      .then((user) => {
        setError(null);
        handleSetUser(user);
        navigate(`/profile/${user.id}`);
      })
      .catch(err =>
        setError(err?.response?.data?.message || "Email o contraseña inválidos")
      );
  };

  return (
    // Usamos 'py-5' para dar aire arriba y abajo, y 'container' para centrar
    <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        {/* Columna controlada: en pantallas grandes ocupa 5 columnas, en medias 7 */}
        <div className="col-lg-5 col-md-7">
          
          {/* Tarjeta con sombra suave (shadow-sm) y sin bordes feos */}
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4 p-md-5">
              
              <h2 className="text-center mb-4 fw-bold text-secondary">Bienvenido de nuevo</h2>
              
              <form onSubmit={handleLogin}>
                
                {/* Grupo Email */}
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label fw-bold text-muted">Email</label>
                  <input
                    onChange={handleChange}
                    type="email"
                    className="form-control form-control-lg bg-light"
                    id="email"
                    name="email"
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>

                {/* Grupo Password */}
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label fw-bold text-muted">Contraseña</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control form-control-lg bg-light"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Mensaje de Error */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                {/* Botón de acción principal */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                  >
                    Iniciar Sesión
                  </button>
                </div>

                {/* Link al registro */}
                <div className="text-center mt-4">
                  <p className="text-muted">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-decoration-none fw-bold text-primary">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;