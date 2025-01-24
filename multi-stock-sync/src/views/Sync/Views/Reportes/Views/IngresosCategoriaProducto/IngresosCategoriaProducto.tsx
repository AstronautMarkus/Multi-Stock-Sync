import React from 'react';
import { useParams } from 'react-router-dom';

const IngresosCategoriaProducto: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();

    return (
        <div>
            <h1>Ingresos por Categoría de Producto</h1>
            <p>Esta es la página de reportes de ingresos por categoría de producto para el cliente {client_id}.</p>
        </div>
    );
};

export default IngresosCategoriaProducto;