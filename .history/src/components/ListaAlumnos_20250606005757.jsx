import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListaAlumnos = ({ alumnos, onEliminarAlumno }) => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);
  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  // Evento sintético onChange para filtro de texto
  const handleFiltroTextoChange = (event) => {
    setFiltroTexto(event.target.value);
  };

  // Evento sintético onChange para filtro de curso
  const handleFiltroCursoChange = (event) => {
    setFiltroCurso(event.target.value);
  };

  // Evento sintético onSubmit para búsqueda
  const handleBusquedaSubmit = (event) => {
    event.preventDefault();
    aplicarFiltros();
  };

  // Evento sintético onClick para mostrar modal de eliminación
  const handleMostrarModalEliminar = (alumno) => {
    setAlumnoAEliminar(alumno);
    setMostrarModalEliminar(true);
  };

  // Evento sintético onClick para cerrar modal de eliminación
  const handleCerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setAlumnoAEliminar(null);
  };

  // Evento sintético onClick para confirmar eliminación
  const handleConfirmarEliminacion = () => {
    if (onEliminarAlumno && alumnoAEliminar) {
      onEliminarAlumno(alumnoAEliminar.Lu);
      alert(`El alumno ${alumnoAEliminar.nombre} ${alumnoAEliminar.apellido} ha sido eliminado exitosamente.`);
    }
    handleCerrarModalEliminar();
  };

  // Función manejadora para aplicar filtros con datos específicos
  const aplicarFiltrosConDatos = (datosAlumnos = alumnos) => {
    let resultados = datosAlumnos;

    if (filtroTexto) {
      resultados = resultados.filter(alumno => 
        alumno.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        alumno.apellido.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        alumno.Lu.toLowerCase().includes(filtroTexto.toLowerCase())
      );
    }

    if (filtroCurso) {
      resultados = resultados.filter(alumno => 
        alumno.curso === filtroCurso
      );
    }

    setAlumnosFiltrados(resultados);
  };

  // Función manejadora para aplicar filtros
  const aplicarFiltros = () => {
    aplicarFiltrosConDatos();
  };

  // Evento sintético onClick para limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltroTexto('');
    setFiltroCurso('');
    setAlumnosFiltrados(alumnos);
  };

  // Uso de evento nativo con addEventListener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mostrarModalEliminar) {
          handleCerrarModalEliminar();
        } else {
          handleLimpiarFiltros();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mostrarModalEliminar]);

  // Aplicar filtros cuando cambien los valores o la lista de alumnos
  useEffect(() => {
    aplicarFiltrosConDatos();
  }, [filtroTexto, filtroCurso, alumnos]);

  // Actualizar lista filtrada cuando cambien los alumnos
  useEffect(() => {
    setAlumnosFiltrados(alumnos);
  }, [alumnos]);

  // Obtener cursos únicos para el select
  const cursosUnicos = [...new Set(alumnos.map(alumno => alumno.curso))];

  return (
    <div className="container">
      <div className="card">
        <h2>Lista de Alumnos</h2>
        
        {/* Formulario de búsqueda con eventos sintéticos */}
        <form onSubmit={handleBusquedaSubmit} className="filtros-form">
          <div className="filtros-row">
            <div className="filtro-campo">
              <label htmlFor="filtroTexto">Buscar por nombre, apellido o LU:</label>
              <input
                id="filtroTexto"
                type="text"
                value={filtroTexto}
                onChange={handleFiltroTextoChange}
                placeholder="Escribe para buscar..."
              />
            </div>
            
            <div className="filtro-campo">
              <label htmlFor="filtroCurso">Filtrar por curso:</label>
              <select 
                id="filtroCurso"
                value={filtroCurso} 
                onChange={handleFiltroCursoChange}
              >
                <option value="">Todos los cursos</option>
                {cursosUnicos.map(curso => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filtros-acciones">
            <button type="submit">🔍 Buscar</button>
            <button type="button" onClick={handleLimpiarFiltros}>
              🗑️ Limpiar Filtros
            </button>
          </div>
          
          <p className="filtros-tip">
            💡 Tip: Presiona 'Escape' para limpiar filtros rápidamente
          </p>
        </form>

        {/* Resultados */}
        {alumnosFiltrados.length === 0 ? (
          <p>No se encontraron alumnos con los criterios especificados.</p>
        ) : (
          <>
            <p className="resultados-info">
              Mostrando {alumnosFiltrados.length} de {alumnos.length} alumnos
            </p>
            <div className="alumnos-grid">
              {alumnosFiltrados.map((alumno) => (
                <div key={alumno.Lu} className="alumno-card">
                  <h3>{alumno.nombre} {alumno.apellido}</h3>
                  <div className="alumno-info">
                    <p><strong>LU:</strong> {alumno.Lu}</p>
                    <p><strong>Curso:</strong> {alumno.curso}</p>
                    <p><strong>Email:</strong> {alumno.email}</p>
                    <p><strong>Domicilio:</strong> {alumno.domicilio}</p>
                    <p><strong>Teléfono:</strong> {alumno.teléfono}</p>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="alumno-actions">
                    <Link to={`/alumnos/${alumno.Lu}`} className="btn-ver">
                      👁️ Ver Detalles
                    </Link>
                    <Link to={`/alumnos/${alumno.Lu}/editar`} className="btn-editar">
                      ✏️ Editar
                    </Link>
                    <button 
                      className="btn-eliminar"
                      onClick={() => handleMostrarModalEliminar(alumno)}
                      title={`Eliminar a ${alumno.nombre} ${alumno.apellido}`}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      {mostrarModalEliminar && alumnoAEliminar && (
        <div className="modal-overlay" onClick={handleCerrarModalEliminar}>
          <div className="modal-content modal-eliminar" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🚨 Confirmar Eliminación</h3>
              <button onClick={handleCerrarModalEliminar} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <div className="alumno-eliminar-preview">
                <div className="foto-placeholder-modal">
                  {alumnoAEliminar.nombre.charAt(0)}{alumnoAEliminar.apellido.charAt(0)}
                </div>
                <div className="info-eliminar">
                  <h4>{alumnoAEliminar.nombre} {alumnoAEliminar.apellido}</h4>
                  <p><strong>LU:</strong> {alumnoAEliminar.Lu}</p>
                  <p><strong>Curso:</strong> {alumnoAEliminar.curso}</p>
                </div>
              </div>
              
              <div className="warning-mensaje">
                <p>¿Estás <strong>seguro</strong> de que deseas eliminar a este alumno?</p>
                <p className="advertencia">⚠️ Esta acción <strong>NO se puede deshacer</strong></p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleCerrarModalEliminar} className="btn-modal-cancelar">
                Cancelar
              </button>
              <button onClick={handleConfirmarEliminacion} className="btn-modal-eliminar">
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAlumnos;
