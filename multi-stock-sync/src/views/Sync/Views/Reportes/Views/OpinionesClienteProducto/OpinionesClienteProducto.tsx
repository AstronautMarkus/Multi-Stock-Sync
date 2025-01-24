import React from 'react';
import { useParams } from 'react-router-dom';

const OpinionesClienteProducto: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();

    return (
        <div>
            <h1>Opiniones de Cliente sobre Producto</h1>
            <p>Esta es una página básica de opiniones de clientes sobre productos para el cliente {client_id}.</p>
        </div>
    );
};

export default OpinionesClienteProducto;