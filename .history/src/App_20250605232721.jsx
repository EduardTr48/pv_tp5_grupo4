import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';

const App = () => {
  const [count, setCount] = useState(0)

  const HomePage = () => {
    // Ejemplo de evento onChange
    const [mensaje, setMensaje] = useState('')
    
    const handleInputChange = (event) => {
      setMensaje(event.target.value)
    }

    // Ejemplo de evento onSubmit
    const handleFormSubmit = (event) => {
      event.preventDefault()
      alert(`Mensaje enviado: ${mensaje}`)
      setMensaje('')
    }

    return (
      <div className="container">
        <div className="card">
          <h1>Bienvenido al Sistema de Gestión de Alumnos</h1>
          <p>Este sistema te permite administrar la información de los estudiantes de manera eficiente.</p>
          <p>Utiliza el menú de navegación para acceder a las diferentes funcionalidades.</p>
          
          {/* Ejemplo de eventos sintéticos */}
          <div style={{ marginTop: '20px', padding: '15px', border: '2px dashed var(--color-accent)', borderRadius: '8px' }}>
            <h3>Ejemplos de Eventos en React:</h3>
            
            {/* Evento onChange */}
            <div style={{ margin: '10px 0' }}>
              <label>
                Escribe un mensaje (onChange): 
                <input 
                  type="text" 
                  value={mensaje}
                  onChange={handleInputChange}
                  placeholder="Escribe algo..."
                  style={{ marginLeft: '10px', width: '200px' }}
                />
              </label>
            </div>
            
            {/* Evento onSubmit */}
            <form onSubmit={handleFormSubmit} style={{ margin: '10px 0' }}>
              <button type="submit">Enviar Mensaje (onSubmit)</button>
            </form>
            
            {mensaje && <p>Escribiendo: {mensaje}</p>}
            
            <p style={{ fontSize: '12px', color: 'var(--color-text-light)', marginTop: '10px' }}>
              💡 Tip: Presiona 'T' para cambiar el tema (evento nativo addEventListener)
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alumnos" element={<div className="container"><div className="card"><h2>Lista de Alumnos</h2></div></div>} />
          <Route path="/alumnos/nuevo" element={<div className="container"><div className="card"><h2>Nuevo Alumno</h2></div></div>} />
          <Route path="/acerca-de" element={<div className="container"><div className="card"><h2>Acerca de</h2></div></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
