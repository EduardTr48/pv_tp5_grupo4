import React from 'react';
import alumnos from '../data/alumnosData.js';

const ListaAlumnos = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Lista de Alumnos</h2>
        
        {alumnos.length === 0 ? (
          <p>No hay alumnos registrados.</p>
        ) : (
          <div className="alumnos-grid">
            {alumnos.map((alumno, index) => (
              <div key={alumno.Lu} className="alumno-card">
                <h3>{alumno.nombre} {alumno.apellido}</h3>
                <div className="alumno-info">
                  <p><strong>LU:</strong> {alumno.Lu}</p>
                  <p><strong>Curso:</strong> {alumno.curso}</p>
                  <p><strong>Email:</strong> {alumno.email}</p>
                  <p><strong>Domicilio:</strong> {alumno.domicilio}</p>
                  <p><strong>Teléfono:</strong> {alumno.teléfono}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAlumnos;
