import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import alumnos from '../data/alumnosData.js';

const EliminarAlumno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Evento sintético onClick para mostrar modal
  const handleMostrarModal = () => {
    setMostrarModal(true);
  };

  // Evento sintético onClick para cerrar modal
  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  // Evento sintético onClick para confirmar eliminación
  const handleConfirmarEliminacion = () => {
    // Simular eliminación (en una app real sería una petición al backend)
    alert(`El alumno ${alumno.nombre} ${alumno.apellido} ha sido eliminado exitosamente.`);
    navigate('/alumnos');
  };

  // Evento sintético onClick para cancelar
  const handleCancelar = () => {
    navigate('/alumnos');
  };

  // Uso de evento nativo con addEventListener
  useEffect(() => {
    // Evento nativo para detectar tecla Escape y cerrar modal o volver
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mostrarModal) {
          handleCerrarModal();
        } else {
          handleCancelar();
        }
      }
    };

    // Agregar event listener nativo
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup del event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mostrarModal]);

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
        <div className="eliminar-header">
          <h2>🗑️ Eliminar Alumno</h2>
          <button onClick={handleCancelar} className="btn-volver-icon" title="Cancelar (Escape)">
            ✕ Cancelar
          </button>
        </div>
        
        <div className="eliminar-content">
          <div className="alumno-preview">
            <div className="foto-placeholder-small">
              {alumno.nombre.charAt(0)}{alumno.apellido.charAt(0)}
            </div>
            <div className="alumno-info-preview">
              <h3>{alumno.nombre} {alumno.apellido}</h3>
              <p><strong>LU:</strong> {alumno.Lu}</p>
              <p><strong>Curso:</strong> {alumno.curso}</p>
              <p><strong>Email:</strong> {alumno.email}</p>
            </div>
          </div>
          
          <div className="eliminar-warning">
            <h4>⚠️ Advertencia</h4>
            <p>Estás a punto de eliminar permanentemente la información del alumno <strong>{alumno.nombre} {alumno.apellido}</strong>.</p>
            <p>Esta acción <strong>NO se puede deshacer</strong>. Todos los datos del alumno serán eliminados del sistema.</p>
          </div>
          
          <div className="eliminar-acciones">
            <button onClick={handleCancelar} className="btn-cancelar">
              ← Cancelar
            </button>
            <button onClick={handleMostrarModal} className="btn-eliminar-final">
              🗑️ Proceder con Eliminación
            </button>
          </div>
        </div>
        
        <p className="eliminar-tip">
          💡 Tip: Presiona 'Escape' para cancelar la operación
        </p>
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🚨 Confirmación Final</h3>
              <button onClick={handleCerrarModal} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <p>¿Estás <strong>absolutamente seguro</strong> de que deseas eliminar al alumno?</p>
              <div className="alumno-confirmacion">
                <strong>{alumno.nombre} {alumno.apellido}</strong>
                <span>LU: {alumno.Lu}</span>
              </div>
              <p className="modal-warning">Esta acción es irreversible.</p>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleCerrarModal} className="btn-modal-cancelar">
                Cancelar
              </button>
              <button onClick={handleConfirmarEliminacion} className="btn-modal-eliminar">
                Sí, Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminarAlumno;
