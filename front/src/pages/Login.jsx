import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/userService";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
      navigate(`/profile/${user.id}`);
    })
    .catch(err =>
      setError(err?.response?.data?.message || "Email o contraseña inválidos")
    );
};

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />

        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />

        </div>

        {error && <p className="alert alert-danger">{error}</p>}

        <button
          type="submit"
          className="submit-button"
        >
          Login
        </button>

        <p className="auth-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
