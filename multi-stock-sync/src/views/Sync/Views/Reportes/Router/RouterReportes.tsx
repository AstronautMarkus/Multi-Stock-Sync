import { Navigate, Route, Routes } from "react-router-dom";

import FiltrarDatos from "../Views/FiltrarDatos/FiltrarDatos";
import ExportarDatos from "../Views/ExportarDatos/ExportarDatos";
import HomeReportes from "../Views/Home/HomeReportes";
import VentasPorDia from "../Views/VentasPorDia/VentasPorDia";
import IngresosSemana from "../Views/IngresosSemana/IngresosSemana";
import { VentasPorMes } from "../Views/VentasPorMes/VentasPorMes";
import IngresosCategoriaProducto from "../Views/IngresosCategoriaProducto/IngresosCategoriaProducto";

function RouterReportes() {

    return (
        <Routes>
           <Route path="/*" element={<Navigate to="/sync/reportes/home" />} />  
            <Route path="home" element={<HomeReportes/>} />
            <Route path="filtrar-datos/:client_id" element={<FiltrarDatos />} />
            <Route path="exportar-datos/:client_id" element={<ExportarDatos />} />
            <Route path="ingreso-semana/:client_id" element={< IngresosSemana/>} />
            <Route path="ventas-dia/:client_id" element={<VentasPorDia />} />
            <Route path="ventas-mes/:client_id" element={<VentasPorMes />} />
            <Route path="ingresos-categoria-producto/:client_id" element={<IngresosCategoriaProducto />} />
        </Routes>
    );
};

export default RouterReportes;