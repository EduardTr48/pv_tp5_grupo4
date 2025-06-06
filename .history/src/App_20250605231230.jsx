import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';

const App = () => {
  const [count, setCount] = useState(0)

  const HomePage = () => (
    <div>
      <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>
      <p>Este sistema te permite administrar la información de los estudiantes de manera eficiente.</p>
      <p>Utiliza el menú de navegación para acceder a las diferentes funcionalidades.</p>
    </div>
  );

  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alumnos" element={<div><h2>Lista de Alumnos</h2></div>} />
          <Route path="/alumnos/nuevo" element={<div><h2>Nuevo Alumno</h2></div>} />
          <Route path="/acerca-de" element={<div><h2>Acerca de</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
