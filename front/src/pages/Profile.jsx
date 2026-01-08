import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../services/userService" // para importar datos

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // importar datos del login 

  useEffect(() => {
    getUserProfile(id)
      .then((userDb) => {
        setUser(userDb);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);


  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No estás logueado</h2>
        <p>
          Por favor <Link to="/login">inicia sesión</Link> para ver tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Perfil de usuario</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default Profile;