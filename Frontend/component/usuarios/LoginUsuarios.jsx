import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import '../../styles/Login.css';
import logo from '../../src/img/logo.jpg';
import usuarioicono from '../../src/img/usuario.jpg';


// Componente principal Login
export default function Login() {

  // Estado para guardar los valores del formulario (usuario y contraseña)
  const [form, setForm] = useState({ Usuario: "", Contraseña: "" });

  // Obtenemos la función login y el error desde el hook
  const { login, error } = useLogin();

  // Función que se ejecuta cuando se escribe en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    login(form); // Llama a la función login pasando los datos
  };

  return (
    // Contenedor principal que divide la pantalla en dos
    <div className="login-container">
      <div className="login-section">
        <img src={usuarioicono} alt="icono de usuario" className="usericono" />
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="Usuario"
            placeholder="Nombre de usuario"
            onChange={handleChange}
            required
          />

          {/* Campo para contraseña */}
          <input
            name="Contraseña"
            placeholder="Contraseña"
            type="password"
            onChange={handleChange}
            required
          />

          {/* Botón para enviar el formulario */}
          <button type="submit">Ingresar</button>
        </form>
      </div>

      <div className="info-section">
        <img src={logo} alt="Logo del Instituto" className="info-logo" />
        <h1>Bienvenido a SmartLab Educación Digital</h1>
        <p>
          Formación inteligente para una era digital
          <br />
          Donde la educación se encuentra con la innovación.
        </p>
      </div>
    </div>
  );
}