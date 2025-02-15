import { Navigate, Route, Routes } from "react-router-dom";

import LayoutSync from "../Layout/LayoutSync";

import RouterProductos from "../Views/Productos/Router/RouterProducto";
import RouterBodegas from "../Views/Bodegas/Router/RouterBodega";
import RouterConexiones from "../Views/Conexiones/Router/RouterConexiones";
import RouterReportes from "../Views/Reportes/Router/RouterReportes";
import { Login } from "../../Auth/Pages";
import Logout from "../../Auth/Pages/Logout";

import Info from "../Views/Info/Info";

import HomeSync from "../Views/Home/HomeSync";

function RouterSync() {
  return (
    <LayoutSync>
      <Routes>
        <Route path="/conexiones/*" element={<RouterConexiones />} />
        <Route path="/home" element={<HomeSync />} />
        <Route path="/productos/*" element={<RouterProductos />} />
        <Route path="/bodegas/*" element={<RouterBodegas />} />
        <Route path="/reportes/*" element={<RouterReportes />} />
        <Route path="/info" element={<Info />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Navigate to="/sync/home" />} />
      </Routes>
    </LayoutSync>
  );
}

export default RouterSync;
