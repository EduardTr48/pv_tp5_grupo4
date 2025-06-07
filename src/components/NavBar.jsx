import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const automaticDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const [isDarkMode, setIsDarkMode] = useState(automaticDarkMode);

    // Evento sintético onClick para toggle del tema
    const handleThemeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Uso de evento nativo con addEventListener en useEffect
    useEffect(() => {
        // Evento nativo para detectar teclas (ejemplo: 'T' para toggle tema)
        const handleKeyPress = (event) => {
            if (event.key === "t" || event.key === "T") {
                setIsDarkMode((prevMode) => !prevMode);
            }
        };

        // Agregar event listener nativo
        document.addEventListener("keydown", handleKeyPress);

        // Cleanup del event listener
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    // Aplicar el tema al documento
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);

    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/alumnos">Lista de Alumnos</Link>
            <Link to="/alumnos/nuevo">Nuevo Alumno</Link>
            <Link to="/acerca-de">Acerca de</Link>

            {/* Botón toggle tema - evento onClick sintético */}
            <button
                className="theme-toggle-nav"
                onClick={handleThemeToggle}
                title="Cambiar tema (o presiona T)"
            >
                {isDarkMode ? "☀️" : "🌙"}
            </button>
        </nav>
    );
};

export default NavBar;
