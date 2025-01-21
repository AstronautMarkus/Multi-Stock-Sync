import { Navigate, Route, Routes } from "react-router-dom";

import LayoutSync from "../Layout/LayoutSync";
import LoginMercado from "../Views/LoginMercadoLibre/LoginMercado";
import RouterProductos from "../Views/Productos/Router/RouterProducto";
import RouterBodegas from "../Views/Bodegas/Router/RouterBodega";
import RouterPerfil from "../Views/Perfil/Router/RouterPerfil";
import HomeSync from "../Views/Home/HomeSync";
import CrearCompania from "../Views/Compania/Views/Crear/CrearCompania";
import EditarCompania from "../Views/Compania/Views/Editar/EditarCompania";

function RouterSync() {
  return (
    <LayoutSync>
      <Routes>
        <Route path="/perfil/*" element={<RouterPerfil />} />
        <Route path="/home" element={<HomeSync />} />
        <Route path="/productos/*" element={<RouterProductos />} />
        <Route path="/bodegas/*" element={<RouterBodegas />} />
        <Route path="/loginMercadoLibre" element={<LoginMercado />} />
        <Route path="/crearcompania/*" element={<CrearCompania />} />
        <Route path="/listacompania/*" element={<EditarCompania />} />

        <Route path="/*" element={<Navigate to="/sync/home" />} />
      </Routes>
    </LayoutSync>
  );
}

export default RouterSync;
