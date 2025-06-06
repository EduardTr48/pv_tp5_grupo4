import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import alumnos from '../data/alumnosData.js';

const DetalleAlumno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);

  // Evento sintético onClick para navegar atrás
  const handleVolver = () => {
    navigate('/alumnos');
  };

  // Uso de evento nativo con addEventListener para navegación con teclas
  useEffect(() => {
    // Evento nativo para detectar tecla Escape y volver
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleVolver();
      }
    };

    // Agregar event listener nativo
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup del event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Buscar el alumno por LU
    const alumnoEncontrado = alumnos.find(a => a.Lu === id);
    setAlumno(alumnoEncontrado);
  }, [id]);

  if (!alumno) {
    return (
      <div className="container">
        <div className="card">
          <h2>Alumno no encontrado</h2>
          <p>No se encontró un alumno con el LU: {id}</p>
          <Link to="/alumnos" className="btn-volver">
            ← Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="detalle-header">
          <h2>Detalles del Alumno</h2>
          <button onClick={handleVolver} className="btn-volver-icon" title="Volver (Escape)">
            ← Volver
          </button>
        </div>
        
        <div className="detalle-content">
          <div className="detalle-foto">
            <div className="foto-placeholder">
              {alumno.nombre.charAt(0)}{alumno.apellido.charAt(0)}
            </div>
          </div>
          
          <div className="detalle-info">
            <h3>{alumno.nombre} {alumno.apellido}</h3>
            
            <div className="info-grid">
              <div className="info-item">
                <label>Libreta Universitaria:</label>
                <span>{alumno.Lu}</span>
              </div>
              
              <div className="info-item">
                <label>Curso:</label>
                <span>{alumno.curso}</span>
              </div>
              
              <div className="info-item">
                <label>Email:</label>
                <span>{alumno.email}</span>
              </div>
              
              <div className="info-item">
                <label>Domicilio:</label>
                <span>{alumno.domicilio}</span>
              </div>
              
              <div className="info-item">
                <label>Teléfono:</label>
                <span>{alumno.teléfono}</span>
              </div>
            </div>
            
            <div className="detalle-acciones">
              <Link to={`/alumnos/${alumno.Lu}/editar`} className="btn-editar">
                ✏️ Editar Alumno
              </Link>
              <Link to="/alumnos" className="btn-lista">
                📋 Ver Lista Completa
              </Link>
            </div>
          </div>
        </div>
        
        <p className="detalle-tip">
          💡 Tip: Presiona 'Escape' para volver a la lista
        </p>
      </div>
    </div>
  );
};

export default DetalleAlumno;
