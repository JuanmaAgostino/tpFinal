import React from "react";
import { useUserStore } from "../../context/guardarIdYRol";

export default function MainAlumnos() {
  
  const { id, nombre, rol } = useUserStore();

  return (
    <div>
      <h1>Bienvenido, {nombre}</h1>
      <p>ID: {id}</p>
      <p>Rol: {rol}</p>
    </div>
  );
}
