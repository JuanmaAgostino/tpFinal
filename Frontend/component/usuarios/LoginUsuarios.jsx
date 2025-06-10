import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [form, setForm] = useState({ Usuario: "", Contraseña: "" });
  const { login, error } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="Usuario"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          required
        />
        <input
          name="Contraseña"
          placeholder="Contraseña"
          type="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
