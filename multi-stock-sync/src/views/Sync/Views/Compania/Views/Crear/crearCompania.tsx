import React, { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import styles from "./crearCompania.module.css";
import { Link } from "react-router-dom";

const CrearCompania: React.FC = () => {
    const [companyName, setCompanyName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    };

    const handleSubmit = async () => {
        if (!companyName.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor ingrese el nombre de la compañía.',
                confirmButtonText: 'Aceptar',
            });
            return;
        }
    
        setIsSubmitting(true);
    
        const requestBody = { name: companyName };
    
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/companies`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Compañía creada exitosamente',
                    text: `La compañía ${companyName} ha sido creada.`,
                    confirmButtonText: 'Aceptar',
                });
                setCompanyName(""); // Limpiar el campo
            } else {
                const responseText = await response.text(); // Leer la respuesta como texto
                let errorResponse;
                try {
                    errorResponse = JSON.parse(responseText); // Intentar parsear como JSON
                } catch {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'El servidor retornó un formato no válido.',
                        confirmButtonText: 'Aceptar',
                    });
                    throw new Error("El servidor retornó un formato no válido.");
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la compañía',
                    text: errorResponse.message || "Error desconocido.",
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Hubo un error de conexión con la API.',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className={styles.main}>
                <h2 className={styles.header}>Crear Compañía</h2>
                <input
                    type="text"
                    value={companyName}
                    onChange={handleInputChange}
                    placeholder="Ingrese la compañía"
                    disabled={isSubmitting}
                    className="input-group-text"
                />
                <div className={styles.buttonContainer}>
                    <button onClick={handleSubmit} disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting ? "Enviando..." : "Agregar Compañía"}
                    </button>
                    <Link to="/sync/Listacompania/*" className="btn btn-primary" >
                    Ver Compañías
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CrearCompania;