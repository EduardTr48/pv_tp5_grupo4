import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import alumnos from '../data/alumnosData.js';

const AgregarAlumno = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Lu: '',
    nombre: '',
    apellido: '',
    curso: '',
    email: '',
    domicilio: '',
    teléfono: ''
  });
  const [errores, setErrores] = useState({});
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Evento sintético onChange para todos los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prevErrores => ({
        ...prevErrores,
        [name]: ''
      }));
    }
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.Lu.trim()) {
      nuevosErrores.Lu = 'La Libreta Universitaria es obligatoria';
    } else if (alumnos.find(a => a.Lu === formData.Lu)) {
      nuevosErrores.Lu = 'Esta Libreta Universitaria ya existe';
    }

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    }

    if (!formData.curso.trim()) {
      nuevosErrores.curso = 'El curso es obligatorio';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El formato del email no es válido';
    }

    if (!formData.domicilio.trim()) {
      nuevosErrores.domicilio = 'El domicilio es obligatorio';
    }

    if (!formData.teléfono.trim()) {
      nuevosErrores.teléfono = 'El teléfono es obligatorio';
    }

    return nuevosErrores;
  };

  // Evento sintético onSubmit para enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const erroresValidacion = validarFormulario();
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setMostrarConfirmacion(true);
  };

  // Evento sintético onClick para confirmar la creación
  const handleConfirmarCreacion = () => {
    // Simular agregado del alumno (en una app real sería una petición al backend)
    alert(`El alumno ${formData.nombre} ${formData.apellido} ha sido agregado exitosamente.`);
    navigate('/alumnos');
  };

  // Evento sintético onClick para cancelar
  const handleCancelar = () => {
    navigate('/alumnos');
  };

  // Evento sintético onClick para cerrar confirmación
  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  // Evento sintético onClick para limpiar formulario
  const handleLimpiarFormulario = () => {
    setFormData({
      Lu: '',
      nombre: '',
      apellido: '',
      curso: '',
      email: '',
      domicilio: '',
      teléfono: ''
    });
    setErrores({});
  };

  // Uso de evento nativo con addEventListener
  useEffect(() => {
    // Evento nativo para detectar tecla Escape y cancelar
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mostrarConfirmacion) {
          handleCerrarConfirmacion();
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
  }, [mostrarConfirmacion]);

  const cursosDisponibles = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];

  return (
    <div className="container">
      <div className="card">
        <div className="formulario-header">
          <h2>➕ Agregar Nuevo Alumno</h2>
          <button onClick={handleCancelar} className="btn-volver-icon" title="Cancelar (Escape)">
            ✕ Cancelar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="formulario-alumno">
          <div className="campos-grid">
            <div className="campo-grupo">
              <label htmlFor="Lu">Libreta Universitaria *</label>
              <input
                type="text"
                id="Lu"
                name="Lu"
                value={formData.Lu}
                onChange={handleInputChange}
                placeholder="Ej: APU00999"
                className={errores.Lu ? 'input-error' : ''}
              />
              {errores.Lu && <span className="error-mensaje">{errores.Lu}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: María Eugenia"
                className={errores.nombre ? 'input-error' : ''}
              />
              {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Ej: Díaz"
                className={errores.apellido ? 'input-error' : ''}
              />
              {errores.apellido && <span className="error-mensaje">{errores.apellido}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="curso">Curso *</label>
              <select
                id="curso"
                name="curso"
                value={formData.curso}
                onChange={handleInputChange}
                className={errores.curso ? 'input-error' : ''}
              >
                <option value="">Seleccionar curso...</option>
                {cursosDisponibles.map(curso => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
              </select>
              {errores.curso && <span className="error-mensaje">{errores.curso}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ej: mariadiaz@mail.com"
                className={errores.email ? 'input-error' : ''}
              />
              {errores.email && <span className="error-mensaje">{errores.email}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="domicilio">Domicilio *</label>
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleInputChange}
                placeholder="Ej: Av. Congreso 125"
                className={errores.domicilio ? 'input-error' : ''}
              />
              {errores.domicilio && <span className="error-mensaje">{errores.domicilio}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="teléfono">Teléfono *</label>
              <input
                type="tel"
                id="teléfono"
                name="teléfono"
                value={formData.teléfono}
                onChange={handleInputChange}
                placeholder="Ej: 3884895999"
                className={errores.teléfono ? 'input-error' : ''}
              />
              {errores.teléfono && <span className="error-mensaje">{errores.teléfono}</span>}
            </div>
          </div>

          <div className="formulario-acciones">
            <button type="button" onClick={handleLimpiarFormulario} className="btn-limpiar">
              🗑️ Limpiar Formulario
            </button>
            <button type="button" onClick={handleCancelar} className="btn-cancelar">
              ← Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              💾 Guardar Alumno
            </button>
          </div>
        </form>

        <p className="formulario-tip">
          💡 Tip: Los campos marcados con * son obligatorios. Presiona 'Escape' para cancelar.
        </p>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="modal-overlay" onClick={handleCerrarConfirmacion}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✅ Confirmar Creación</h3>
              <button onClick={handleCerrarConfirmacion} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <p>¿Estás seguro de que deseas crear el siguiente alumno?</p>
              <div className="alumno-preview-modal">
                <strong>{formData.nombre} {formData.apellido}</strong>
                <div className="datos-preview">
                  <span><strong>LU:</strong> {formData.Lu}</span>
                  <span><strong>Curso:</strong> {formData.curso}</span>
                  <span><strong>Email:</strong> {formData.email}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleCerrarConfirmacion} className="btn-modal-cancelar">
                Revisar
              </button>
              <button onClick={handleConfirmarCreacion} className="btn-modal-confirmar">
                Sí, Crear Alumno
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarAlumno;
