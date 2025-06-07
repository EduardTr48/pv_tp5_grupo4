import { useState } from "react"; // Importa useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ListaAlumnos from "./components/ListaAlumnos.jsx";
import DetalleAlumno from "./components/DetalleAlumno.jsx";
import EliminarAlumno from "./components/EliminarAlumno.jsx";
import AgregarAlumno from "./components/AgregarAlumno.jsx";
import EditarAlumno from "./components/EditarAlumno.jsx";
import AcercaDe from "./components/AcercaDe.jsx";
import alumnosIniciales from "./data/alumnosData.js";
import HomePage from "./components/HomePage.jsx";

const App = () => {
    const [alumnos, setAlumnos] = useState(alumnosIniciales);

    // Función para agregar un nuevo alumno
    const agregarAlumno = (nuevoAlumno) => {
        setAlumnos((prevAlumnos) => [...prevAlumnos, nuevoAlumno]);
    };

    // Función para actualizar un alumno existente
    const actualizarAlumno = (luOriginal, datosActualizados) => {
        setAlumnos((prevAlumnos) =>
            prevAlumnos.map((alumno) =>
                alumno.Lu === luOriginal ? { ...datosActualizados } : alumno
            )
        );
    };

    // Función para eliminar un alumno
    const eliminarAlumno = (luAlumno) => {
        setAlumnos((prevAlumnos) =>
            prevAlumnos.filter((alumno) => alumno.Lu !== luAlumno)
        );
    };

    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/alumnos"
                        element={
                            <ListaAlumnos
                                alumnos={alumnos}
                                onEliminarAlumno={eliminarAlumno}
                            />
                        }
                    />
                    <Route
                        path="/alumnos/nuevo"
                        element={
                            <AgregarAlumno
                                onAgregarAlumno={agregarAlumno}
                                alumnos={alumnos}
                            />
                        }
                    />
                    <Route
                        path="/alumnos/:id"
                        element={<DetalleAlumno alumnos={alumnos} />}
                    />
                    <Route
                        path="/alumnos/:id/editar"
                        element={
                            <EditarAlumno
                                alumnos={alumnos}
                                onActualizarAlumno={actualizarAlumno}
                            />
                        }
                    />
                    <Route
                        path="/alumnos/:id/eliminar"
                        element={
                            <EliminarAlumno
                                alumnos={alumnos}
                                onEliminarAlumno={eliminarAlumno}
                            />
                        }
                    />
                    <Route path="/acerca-de" element={<AcercaDe />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
