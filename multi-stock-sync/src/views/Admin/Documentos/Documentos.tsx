import React from 'react';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import './Documentos.css';

const Documentos: React.FC = () => {
    return (
        <>
            <AdminNavbar />
            <div className="d-flex flex-grow-1 main-container">
                <div className="w-50 bg-light p-3 d-flex align-items-center justify-content-center">
                    <div>
                        <h1>Contenido Izquierdo</h1>
                        <p>Aquí va el contenido principal del lado izquierdo.</p>
                    </div>
                </div>
                <div className="w-50 custom-gray p-3 d-flex align-items-center justify-content-center">
                    <div>
                        <h1>Contenido Derecho</h1>
                        <p>Aquí va el contenido principal del lado derecho.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Documentos;