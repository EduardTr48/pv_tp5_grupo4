import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/alumnos">Lista de Alumnos</Link>
      <Link to="/alumnos/nuevo">Nuevo Alumno</Link>
      <Link to="/acerca-de">Acerca de</Link>
    </nav>
  );
};

export default NavBar;