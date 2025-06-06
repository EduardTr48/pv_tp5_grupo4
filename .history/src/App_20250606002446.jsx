import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ListaAlumnos from './components/ListaAlumnos.jsx';
import DetalleAlumno from './components/DetalleAlumno.jsx';
import EliminarAlumno from './components/EliminarAlumno.jsx';
import AgregarAlumno from './components/AgregarAlumno.jsx';

const App = () => {
  const [count, setCount] = useState(0)

  const HomePage = () => (
    <div className="container">
      <div className="card">
        <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>
        <p>Este sistema te permite administrar la información de los estudiantes de manera eficiente.</p>
        <p>Utiliza el menú de navegación para acceder a las diferentes funcionalidades.</p>
      </div>
    </div>
  );

  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alumnos" element={<ListaAlumnos />} />
          <Route path="/alumnos/nuevo" element={<AgregarAlumno />} />
          <Route path="/alumnos/:id" element={<DetalleAlumno />} />
          <Route path="/alumnos/:id/editar" element={<div className="container"><div className="card"><h2>Editar Alumno</h2></div></div>} />
          <Route path="/alumnos/:id/eliminar" element={<EliminarAlumno />} />
          <Route path="/acerca-de" element={<div className="container"><div className="card"><h2>Acerca de</h2></div></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
