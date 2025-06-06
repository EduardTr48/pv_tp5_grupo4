import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alumnos from '../data/alumnosData.js';

const ListaAlumnos = () => {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [alumnosFiltrados, setAlumnosFiltrados] = useState(alumnos);

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

  // Función manejadora para aplicar filtros
  const aplicarFiltros = () => {
    let resultados = alumnos;

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

  // Evento sintético onClick para limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltroTexto('');
    setFiltroCurso('');
    setAlumnosFiltrados(alumnos);
  };

  // Uso de evento nativo con addEventListener
  useEffect(() => {
    // Evento nativo para detectar Escape y limpiar filtros
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleLimpiarFiltros();
      }
    };

    // Agregar event listener nativo
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup del event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Aplicar filtros cuando cambien los valores
  useEffect(() => {
    aplicarFiltros();
  }, [filtroTexto, filtroCurso]);

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
              {alumnosFiltrados.map((alumno, index) => (
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
                    <Link to={`/alumnos/${alumno.Lu}/editar`} className="btn-editar">
                      ✏️ Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListaAlumnos;
