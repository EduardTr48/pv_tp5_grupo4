import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';

const App = () => {
  const [count, setCount] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')

  const HomePage = () => {
    const handleClick = () => {
      setMensaje('¡Botón clickeado! Ejemplo de evento onClick')
    }

    const handleChange = (e) => {
      setNombre(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setMensaje(`¡Formulario enviado! Hola ${nombre}`)
    }

    return (
      <div>
        <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>
        <p>Este sistema te permite administrar la información de los estudiantes de manera eficiente.</p>
        <p>Utiliza el menú de navegación para acceder a las diferentes funcionalidades.</p>
        
        <h3>Ejemplos de Eventos Sintéticos:</h3>
        
        {/* Ejemplo onClick */}
        <button onClick={handleClick}>
          Ejemplo onClick
        </button>
        
        {/* Ejemplo onChange */}
        <div style={{ margin: '10px 0' }}>
          <label>
            Tu nombre: 
            <input 
              type="text" 
              value={nombre} 
              onChange={handleChange}
              placeholder="Escribe tu nombre"
            />
          </label>
        </div>
        
        {/* Ejemplo onSubmit */}
        <form onSubmit={handleSubmit}>
          <button type="submit">Ejemplo onSubmit</button>
        </form>
        
        {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
      </div>
    )
  }

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
