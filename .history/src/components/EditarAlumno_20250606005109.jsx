import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditarAlumno = ({ alumnos, onActualizarAlumno }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumnoOriginal, setAlumnoOriginal] = useState(null);
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
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [cambiosRealizados, setCambiosRealizados] = useState(false);

  const cursosDisponibles = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validación de LU (solo verificar duplicados si cambió)
    if (!formData.Lu.trim()) {
      nuevosErrores.Lu = 'La Libreta Universitaria es obligatoria';
    } else if (formData.Lu !== alumnoOriginal.Lu) {
      const luExistente = alumnos.find(a => a.Lu.toLowerCase() === formData.Lu.toLowerCase().trim() && a.Lu !== alumnoOriginal.Lu);
      if (luExistente) {
        nuevosErrores.Lu = 'Esta Libreta Universitaria ya está registrada en el sistema';
      }
    }

    // Validación de nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación de apellido
    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    } else if (formData.apellido.trim().length < 2) {
      nuevosErrores.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validación de curso
    if (!formData.curso.trim()) {
      nuevosErrores.curso = 'El curso es obligatorio';
    }

    // Validación de email (solo verificar duplicados si cambió)
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El formato del email no es válido';
    } else if (formData.email !== alumnoOriginal.email) {
      const emailExistente = alumnos.find(a => a.email.toLowerCase() === formData.email.toLowerCase().trim() && a.Lu !== alumnoOriginal.Lu);
      if (emailExistente) {
        nuevosErrores.email = 'Este email ya está registrado en el sistema';
      }
    }

    // Validación de domicilio
    if (!formData.domicilio.trim()) {
      nuevosErrores.domicilio = 'El domicilio es obligatorio';
    } else if (formData.domicilio.trim().length < 5) {
      nuevosErrores.domicilio = 'El domicilio debe ser más específico (mínimo 5 caracteres)';
    }

    // Validación de teléfono (solo verificar duplicados si cambió)
    if (!formData.teléfono.trim()) {
      nuevosErrores.teléfono = 'El teléfono es obligatorio';
    } else if (!/^\d{8,15}$/.test(formData.teléfono.replace(/\s/g, ''))) {
      nuevosErrores.teléfono = 'El teléfono debe contener entre 8 y 15 dígitos';
    } else if (formData.teléfono !== alumnoOriginal.teléfono) {
      const telefonoExistente = alumnos.find(a => a.teléfono.replace(/\s/g, '') === formData.teléfono.replace(/\s/g, '') && a.Lu !== alumnoOriginal.Lu);
      if (telefonoExistente) {
        nuevosErrores.teléfono = 'Este número de teléfono ya está registrado en el sistema';
      }
    }

    // Validación de nombre completo (solo si cambió)
    if (formData.nombre !== alumnoOriginal.nombre || formData.apellido !== alumnoOriginal.apellido) {
      const nombreCompletoExistente = alumnos.find(a => 
        a.nombre.toLowerCase().trim() === formData.nombre.toLowerCase().trim() && 
        a.apellido.toLowerCase().trim() === formData.apellido.toLowerCase().trim() &&
        a.Lu !== alumnoOriginal.Lu
      );
      if (nombreCompletoExistente) {
        nuevosErrores.nombre = 'Ya existe un alumno con este nombre y apellido';
        nuevosErrores.apellido = 'Ya existe un alumno con este nombre y apellido';
      }
    }

    return nuevosErrores;
  };

  // Función para formatear teléfono
  const formatearTelefono = (valor) => {
    const soloNumeros = valor.replace(/\D/g, '');
    return soloNumeros.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Función para verificar si hay cambios
  const verificarCambios = (datos) => {
    if (!alumnoOriginal) return false;
    
    return Object.keys(datos).some(key => 
      datos[key].toString().trim() !== alumnoOriginal[key].toString().trim()
    );
  };

  // Evento sintético onChange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    let valorProcesado = value;
    
    if (name === 'teléfono') {
      valorProcesado = formatearTelefono(value);
    }
    
    if (name === 'nombre' || name === 'apellido') {
      valorProcesado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    
    if (name === 'email') {
      valorProcesado = value.toLowerCase();
    }
    
    const nuevosFormData = {
      ...formData,
      [name]: valorProcesado
    };
    
    setFormData(nuevosFormData);
    setCambiosRealizados(verificarCambios(nuevosFormData));
    
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prevErrores => ({
        ...prevErrores,
        [name]: ''
      }));
    }

    // Validación en tiempo real para campos críticos
    if (name === 'Lu' && valorProcesado.trim() && valorProcesado !== alumnoOriginal?.Lu) {
      const luExistente = alumnos.find(a => a.Lu.toLowerCase() === valorProcesado.toLowerCase().trim() && a.Lu !== alumnoOriginal.Lu);
      if (luExistente) {
        setErrores(prevErrores => ({
          ...prevErrores,
          Lu: 'Esta Libreta Universitaria ya está registrada'
        }));
      }
    }
    
    if (name === 'email' && valorProcesado.trim() && /\S+@\S+\.\S+/.test(valorProcesado) && valorProcesado !== alumnoOriginal?.email) {
      const emailExistente = alumnos.find(a => a.email.toLowerCase() === valorProcesado.toLowerCase().trim() && a.Lu !== alumnoOriginal.Lu);
      if (emailExistente) {
        setErrores(prevErrores => ({
          ...prevErrores,
          email: 'Este email ya está registrado'
        }));
      }
    }
  };

  // Evento sintético onSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!cambiosRealizados) {
      alert('No se han realizado cambios en los datos del alumno.');
      return;
    }
    
    const erroresValidacion = validarFormulario();
    
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setMostrarConfirmacion(true);
  };

  // Evento sintético onClick para confirmar actualización
  const handleConfirmarActualizacion = () => {
    const datosActualizados = {
      Lu: formData.Lu,
      nombre: formData.nombre,
      apellido: formData.apellido,
      curso: formData.curso,
      email: formData.email,
      domicilio: formData.domicilio,
      teléfono: formData.teléfono
    };
    
    if (onActualizarAlumno) {
      onActualizarAlumno(alumnoOriginal.Lu, datosActualizados);
    }
    
    setMostrarConfirmacion(false);
    setMostrarModalExito(true);
  };

  // Eventos onClick para modales
  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  const handleCerrarModalExito = () => {
    setMostrarModalExito(false);
    navigate('/alumnos');
  };

  const handleCancelar = () => {
    if (cambiosRealizados) {
      if (window.confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?')) {
        navigate('/alumnos');
      }
    } else {
      navigate('/alumnos');
    }
  };

  const handleRestaurarDatos = () => {
    if (alumnoOriginal) {
      setFormData({ ...alumnoOriginal });
      setErrores({});
      setCambiosRealizados(false);
    }
  };

  // Uso de evento nativo con addEventListener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mostrarConfirmacion) {
          handleCerrarConfirmacion();
        } else {
          handleCancelar();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mostrarConfirmacion, cambiosRealizados]);

  // Cargar datos del alumno
  useEffect(() => {
    const alumnoEncontrado = alumnos.find(a => a.Lu === id);
    if (alumnoEncontrado) {
      setAlumnoOriginal(alumnoEncontrado);
      setFormData({ ...alumnoEncontrado });
    }
  }, [id, alumnos]);

  if (!alumnoOriginal) {
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
        <div className="formulario-header">
          <h2>✏️ Editar Alumno</h2>
          <button onClick={handleCancelar} className="btn-volver-icon" title="Cancelar (Escape)">
            ✕ Cancelar
          </button>
        </div>

        <div className="alumno-info-header">
          <div className="foto-placeholder-crear">
            {alumnoOriginal.nombre.charAt(0)}{alumnoOriginal.apellido.charAt(0)}
          </div>
          <div>
            <h3>Editando: {alumnoOriginal.nombre} {alumnoOriginal.apellido}</h3>
            <p>LU Original: {alumnoOriginal.Lu}</p>
            {cambiosRealizados && <span className="cambios-indicador">✨ Cambios detectados</span>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="formulario-alumno">
          <div className="campos-grid">
            <div className="campo-grupo">
              <label htmlFor="Lu">🆔 Libreta Universitaria *</label>
              <input
                type="text"
                id="Lu"
                name="Lu"
                value={formData.Lu}
                onChange={handleInputChange}
                placeholder="Ej: APU00999"
                className={errores.Lu ? 'input-error' : (formData.Lu !== alumnoOriginal.Lu ? 'input-changed' : '')}
                maxLength="20"
              />
              {errores.Lu && <span className="error-mensaje">⚠️ {errores.Lu}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="nombre">👤 Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: María Eugenia"
                className={errores.nombre ? 'input-error' : (formData.nombre !== alumnoOriginal.nombre ? 'input-changed' : '')}
                maxLength="50"
              />
              {errores.nombre && <span className="error-mensaje">⚠️ {errores.nombre}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="apellido">👤 Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Ej: Díaz"
                className={errores.apellido ? 'input-error' : (formData.apellido !== alumnoOriginal.apellido ? 'input-changed' : '')}
                maxLength="50"
              />
              {errores.apellido && <span className="error-mensaje">⚠️ {errores.apellido}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="curso">🎓 Curso *</label>
              <select
                id="curso"
                name="curso"
                value={formData.curso}
                onChange={handleInputChange}
                className={errores.curso ? 'input-error' : (formData.curso !== alumnoOriginal.curso ? 'input-changed' : '')}
              >
                <option value="">Seleccionar curso...</option>
                {cursosDisponibles.map(curso => (
                  <option key={curso} value={curso}>{curso}</option>
                ))}
              </select>
              {errores.curso && <span className="error-mensaje">⚠️ {errores.curso}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="email">📧 Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ej: mariadiaz@mail.com"
                className={errores.email ? 'input-error' : (formData.email !== alumnoOriginal.email ? 'input-changed' : '')}
                maxLength="100"
              />
              {errores.email && <span className="error-mensaje">⚠️ {errores.email}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="domicilio">🏠 Domicilio *</label>
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleInputChange}
                placeholder="Ej: Av. Congreso 125, Ciudad"
                className={errores.domicilio ? 'input-error' : (formData.domicilio !== alumnoOriginal.domicilio ? 'input-changed' : '')}
                maxLength="200"
              />
              {errores.domicilio && <span className="error-mensaje">⚠️ {errores.domicilio}</span>}
            </div>

            <div className="campo-grupo">
              <label htmlFor="teléfono">📱 Teléfono *</label>
              <input
                type="tel"
                id="teléfono"
                name="teléfono"
                value={formData.teléfono}
                onChange={handleInputChange}
                placeholder="Ej: 3884 8959 99"
                className={errores.teléfono ? 'input-error' : (formData.teléfono !== alumnoOriginal.teléfono ? 'input-changed' : '')}
                maxLength="20"
              />
              {errores.teléfono && <span className="error-mensaje">⚠️ {errores.teléfono}</span>}
            </div>
          </div>

          <div className="formulario-acciones">
            <button type="button" onClick={handleRestaurarDatos} className="btn-restaurar">
              🔄 Restaurar Datos
            </button>
            <button type="button" onClick={handleCancelar} className="btn-cancelar">
              ← Cancelar
            </button>
            <button type="submit" className="btn-guardar" disabled={!cambiosRealizados}>
              💾 Guardar Cambios
            </button>
          </div>
        </form>

        <p className="formulario-tip">
          💡 <strong>Tip:</strong> Los campos modificados se resaltan en azul. Se verificará que no existan duplicados al cambiar LU, email o teléfono. Presiona 'Escape' para cancelar.
        </p>
      </div>

      {/* Modal de confirmación de actualización */}
      {mostrarConfirmacion && (
        <div className="modal-overlay" onClick={handleCerrarConfirmacion}>
          <div className="modal-content modal-editar" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Confirmar Actualización</h3>
              <button onClick={handleCerrarConfirmacion} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <p>¿Estás seguro de que deseas actualizar los datos del siguiente alumno?</p>
              
              <div className="alumno-editar-preview">
                <div className="foto-placeholder-crear">
                  {formData.nombre.charAt(0)}{formData.apellido.charAt(0)}
                </div>
                <div className="info-editar">
                  <h4>{formData.nombre} {formData.apellido}</h4>
                  <div className="cambios-resumen">
                    {Object.keys(formData).map(campo => {
                      if (formData[campo] !== alumnoOriginal[campo]) {
                        return (
                          <div key={campo} className="cambio-item">
                            <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                            <div className="cambio-valores">
                              <span className="valor-anterior">{alumnoOriginal[campo]}</span>
                              <span className="flecha">→</span>
                              <span className="valor-nuevo">{formData[campo]}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleCerrarConfirmacion} className="btn-modal-cancelar">
                Revisar
              </button>
              <button onClick={handleConfirmarActualizacion} className="btn-modal-confirmar">
                Sí, Actualizar Datos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {mostrarModalExito && (
        <div className="modal-overlay" onClick={handleCerrarModalExito}>
          <div className="modal-content modal-exito" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎉 ¡Alumno Actualizado Exitosamente!</h3>
              <button onClick={handleCerrarModalExito} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <div className="mensaje-exito">
                <div className="icono-exito">✅</div>
                <p>Los datos del alumno <strong>{formData.nombre} {formData.apellido}</strong> han sido actualizados exitosamente.</p>
                <p>Los cambios ya están reflejados en el sistema.</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button onClick={handleCerrarModalExito} className="btn-modal-aceptar">
                Ver Lista de Alumnos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarAlumno;
