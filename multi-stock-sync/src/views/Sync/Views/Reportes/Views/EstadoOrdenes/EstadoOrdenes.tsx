import React from 'react';
import { useParams } from 'react-router-dom';

const EstadoOrdenes: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();

    return (
        <div>
            <h1>Estado de Ordenes</h1>
            <p>Esta es la página de estado de órdenes para el cliente {client_id}.</p>
        </div>
    );
};

export default EstadoOrdenes;