import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const handleDropdownToggle = (dropdown: 'settings' | 'user') => {
        if (dropdown === 'settings') {
            setDropdownOpen(!dropdownOpen);
            if (userDropdownOpen) setUserDropdownOpen(false);
        } else {
            setUserDropdownOpen(!userDropdownOpen);
            if (dropdownOpen) setDropdownOpen(false);
        }
    };

    return (
        <nav className="main-navbar navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    <img src="/path-to-logo.png" alt="Multi-Stock-Sync" className="main-logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/documentos">Documentos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/punto-venta/despacho">Despacho</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/punto-venta">Punto de Venta</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Stock</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Reportes</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-yellow me-2">¡Ayuda!</button>
                        <div className="settings-dropdown">
                            <button className="btn btn-secondary" onClick={() => handleDropdownToggle('settings')}>
                                <FontAwesomeIcon icon={faCog} />
                            </button>
                            <div className={`settings-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                <Link className="settings-dropdown-item" to="/admin/productos-servicios">Productos y Servicios</Link>
                                <Link className="settings-dropdown-item" to="#">Lista de Precios</Link>
                                <Link className="settings-dropdown-item" to="#">Clientes</Link>
                                <Link className="settings-dropdown-item" to="#">Sucursales</Link>
                                <Link className="settings-dropdown-item" to="#">Ver Mas</Link>
                            </div>
                        </div>
                        <div className="user-info d-flex align-items-center">
                            <div className="user-dropdown">
                                <div className="user-initial-circle" onClick={() => handleDropdownToggle('user')}>P</div>
                                <div className={`user-dropdown-menu ${userDropdownOpen ? 'show' : ''}`}>
                                    <div className="user-dropdown-item user-info-item">Persona_12345678</div>
                                    <Link className="user-dropdown-item" to="#">Casa Matriz</Link>
                                    <Link className="user-dropdown-item" to="#">Cambiar de Empresa</Link>
                                    <Link className="user-dropdown-item" to="#">Cambiar Contraseña</Link>
                                    <Link className="user-dropdown-item" to="#">Mi Cuenta</Link>
                                    <Link className="user-dropdown-item" to="#">Mis Sistemas</Link>
                                    <Link className="user-dropdown-item" to="#">Salir</Link>
                                </div>
                            </div>
                            <div>
                                <span className="user-name">Persona</span>
                                <br />
                                <span className="business-name">Casa Matriz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;