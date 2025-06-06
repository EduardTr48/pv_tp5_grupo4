import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AgregarAlumno = ({ onAgregarAlumno, alumnos = [] }) => {
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
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  const cursosDisponibles = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validación de LU
    if (!formData.Lu.trim()) {
      nuevosErrores.Lu = 'La Libreta Universitaria es obligatoria';
    } else {
      // Verificar duplicado de LU
      const luExistente = alumnos.find(a => a.Lu.toLowerCase() === formData.Lu.toLowerCase().trim());
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

    // Validación de email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El formato del email no es válido';
    } else {
      // Verificar duplicado de email
      const emailExistente = alumnos.find(a => a.email.toLowerCase() === formData.email.toLowerCase().trim());
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

    // Validación de teléfono
    if (!formData.teléfono.trim()) {
      nuevosErrores.teléfono = 'El teléfono es obligatorio';
    } else if (!/^\d{8,15}$/.test(formData.teléfono.replace(/\s/g, ''))) {
      nuevosErrores.teléfono = 'El teléfono debe contener entre 8 y 15 dígitos';
    } else {
      // Verificar duplicado de teléfono
      const telefonoExistente = alumnos.find(a => a.teléfono.replace(/\s/g, '') === formData.teléfono.replace(/\s/g, ''));
      if (telefonoExistente) {
        nuevosErrores.teléfono = 'Este número de teléfono ya está registrado en el sistema';
      }
    }

    // Validación adicional: verificar combinación nombre + apellido
    const nombreCompletoExistente = alumnos.find(a => 
      a.nombre.toLowerCase().trim() === formData.nombre.toLowerCase().trim() && 
      a.apellido.toLowerCase().trim() === formData.apellido.toLowerCase().trim()
    );
    if (nombreCompletoExistente) {
      nuevosErrores.nombre = 'Ya existe un alumno con este nombre y apellido';
      nuevosErrores.apellido = 'Ya existe un alumno con este nombre y apellido';
    }

    return nuevosErrores;
  };

  // Función para formatear teléfono mientras se escribe
  const formatearTelefono = (valor) => {
    // Eliminar caracteres no numéricos
    const soloNumeros = valor.replace(/\D/g, '');
    // Formatear con espacios cada 4 dígitos
    return soloNumeros.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Evento sintético onChange mejorado para validación en tiempo real
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    let valorProcesado = value;
    
    // Formateo específico para teléfono
    if (name === 'teléfono') {
      valorProcesado = formatearTelefono(value);
    }
    
    // Formateo para nombre y apellido (primera letra mayúscula)
    if (name === 'nombre' || name === 'apellido') {
      valorProcesado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    
    // Formateo para email (minúsculas)
    if (name === 'email') {
      valorProcesado = value.toLowerCase();
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: valorProcesado
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prevErrores => ({
        ...prevErrores,
        [name]: ''
      }));
    }
    
    // Validación en tiempo real para campos críticos
    if (name === 'Lu' && valorProcesado.trim()) {
      const luExistente = alumnos.find(a => a.Lu.toLowerCase() === valorProcesado.toLowerCase().trim());
      if (luExistente) {
        setErrores(prevErrores => ({
          ...prevErrores,
          Lu: 'Esta Libreta Universitaria ya está registrada'
        }));
      }
    }
    
    if (name === 'email' && valorProcesado.trim() && /\S+@\S+\.\S+/.test(valorProcesado)) {
      const emailExistente = alumnos.find(a => a.email.toLowerCase() === valorProcesado.toLowerCase().trim());
      if (emailExistente) {
        setErrores(prevErrores => ({
          ...prevErrores,
          email: 'Este email ya está registrado'
        }));
      }
    }
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
    // Crear el nuevo alumno con los datos del formulario
    const nuevoAlumno = {
      Lu: formData.Lu,
      nombre: formData.nombre,
      apellido: formData.apellido,
      curso: formData.curso,
      email: formData.email,
      domicilio: formData.domicilio,
      teléfono: formData.teléfono
    };
    
    // Agregar el alumno a la lista usando la función prop
    if (onAgregarAlumno) {
      onAgregarAlumno(nuevoAlumno);
    }
    
    // Mostrar modal de éxito en lugar de alert
    setMostrarConfirmacion(false);
    setMostrarModalExito(true);
  };

  // Evento sintético onClick para cancelar
  const handleCancelar = () => {
    navigate('/alumnos');
  };

  // Evento sintético onClick para cerrar confirmación
  const handleCerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  // Evento sintético onClick para cerrar modal de éxito y navegar
  const handleCerrarModalExito = () => {
    setMostrarModalExito(false);
    navigate('/alumnos');
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
              <label htmlFor="Lu">🆔 Libreta Universitaria *</label>
              <input
                type="text"
                id="Lu"
                name="Lu"
                value={formData.Lu}
                onChange={handleInputChange}
                placeholder="Ej: APU00999"
                className={errores.Lu ? 'input-error' : ''}
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
                className={errores.nombre ? 'input-error' : ''}
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
                className={errores.apellido ? 'input-error' : ''}
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
                className={errores.curso ? 'input-error' : ''}
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
                className={errores.email ? 'input-error' : ''}
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
                className={errores.domicilio ? 'input-error' : ''}
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
                className={errores.teléfono ? 'input-error' : ''}
                maxLength="20"
              />
              {errores.teléfono && <span className="error-mensaje">⚠️ {errores.teléfono}</span>}
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
          💡 <strong>Tip:</strong> Los campos marcados con * son obligatorios. Se verificará que no existan duplicados en LU, email y teléfono. Presiona 'Escape' para cancelar.
        </p>
      </div>

      {/* Modal de confirmación de creación */}
      {mostrarConfirmacion && (
        <div className="modal-overlay" onClick={handleCerrarConfirmacion}>
          <div className="modal-content modal-crear" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✅ Confirmar Creación</h3>
              <button onClick={handleCerrarConfirmacion} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <p>¿Estás seguro de que deseas crear el siguiente alumno?</p>
              
              <div className="alumno-crear-preview">
                <div className="foto-placeholder-crear">
                  {formData.nombre.charAt(0) || '?'}{formData.apellido.charAt(0) || '?'}
                </div>
                <div className="info-crear">
                  <h4>{formData.nombre} {formData.apellido}</h4>
                  <div className="datos-crear">
                    <div className="dato-item">
                      <label>LU:</label>
                      <span>{formData.Lu}</span>
                    </div>
                    <div className="dato-item">
                      <label>Curso:</label>
                      <span>{formData.curso}</span>
                    </div>
                    <div className="dato-item">
                      <label>Email:</label>
                      <span>{formData.email}</span>
                    </div>
                  </div>
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

      {/* Modal de éxito */}
      {mostrarModalExito && (
        <div className="modal-overlay" onClick={handleCerrarModalExito}>
          <div className="modal-content modal-exito" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎉 ¡Alumno Creado Exitosamente!</h3>
              <button onClick={handleCerrarModalExito} className="modal-close">✕</button>
            </div>
            
            <div className="modal-body">
              <div className="mensaje-exito">
                <div className="icono-exito">✅</div>
                <p>El alumno <strong>{formData.nombre} {formData.apellido}</strong> ha sido agregado exitosamente al sistema.</p>
                <p>Ya puedes verlo en la lista de alumnos.</p>
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

export default AgregarAlumno;
