import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './HomeSync.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBoxOpen,faWarehouse,faPlug,faBuilding} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const HomeSync: React.FC = () => {    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <br />
                <h1>Multi Stock Sync</h1>
                <h4>Panel de sincronización</h4>
                <br />
                <h4>Seleccione una opción para comenzar:</h4>
            </div>
            <br />      
            <div className={`${styles.buttonsContainer} mt-4`}>
                <div className={styles.buttonWrapper}>
                    <FontAwesomeIcon icon={faBoxOpen} size="5x" className={`${styles.icon} ${styles.icon_products_color}`} />
                    <NavLink to={"/sync/productos"} className={`${styles.button} ${styles.products_color}`}>Productos</NavLink>
                </div>
                <div className={styles.buttonWrapper}>
                    <FontAwesomeIcon icon={faWarehouse} size="5x" className={`${styles.icon} ${styles.icon_warehouses_color}`} />
                    <NavLink to={"/sync/bodegas"} className={`${styles.button} ${styles.warehouses_color}`}>Bodegas</NavLink>
                </div>
                <div className={styles.buttonWrapper}>
                    <FontAwesomeIcon icon={faPlug} size="5x" className={`${styles.icon} ${styles.icon_connections_color}`} />
                    <NavLink to={"/sync/perfil"} className={`${styles.button} ${styles.connections_color}`}>Conexiones a ML</NavLink>
                </div>
                <div className={styles.buttonWrapper}>
                    <FontAwesomeIcon icon={faBuilding} size="5x" className={`${styles.icon} ${styles.icon_connections_color_building}`} />
                    <NavLink to={"/sync/crearcompania/"} className={`${styles.button} ${styles.connections_color_building}`}>Compañias</NavLink>
                </div>
            </div>
        </div> 
    );
};
export default HomeSync;
