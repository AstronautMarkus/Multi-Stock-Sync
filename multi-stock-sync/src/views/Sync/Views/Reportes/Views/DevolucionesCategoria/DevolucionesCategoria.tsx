import React from 'react';
import { useParams } from 'react-router-dom';

const DevolucionesCategoria: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();

    return (
        <div>
            <h1>Devoluciones por Categoría</h1>
            <p>Esta es la página de devoluciones por categoría para el cliente {client_id}.</p>
        </div>
    );
};

export default DevolucionesCategoria;