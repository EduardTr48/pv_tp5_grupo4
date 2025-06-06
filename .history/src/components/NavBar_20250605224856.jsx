import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', gap: '15px' }}>
      <Link to="/">Inicio</Link>
      <Link to="/alumnos">Lista de Alumnos</Link>
      <Link to="/alumnos/nuevo">Nuevo Alumno</Link>
      <Link to="/acerca-de">Acerca de</Link>
    </nav>
  );
};

export default NavBar;