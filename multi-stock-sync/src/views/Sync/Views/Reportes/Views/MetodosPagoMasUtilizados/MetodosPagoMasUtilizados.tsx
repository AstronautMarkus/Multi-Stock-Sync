import React from 'react';
import { useParams } from 'react-router-dom';

const MetodosPagoMasUtilizados: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();

    return (
        <div>
            <h1>Métodos de Pago Más Utilizados</h1>
            <p>Esta es una página básica para mostrar los métodos de pago más utilizados para el cliente {client_id}.</p>
        </div>
    );
};

export default MetodosPagoMasUtilizados;