import { Navigate, Route, Routes } from "react-router-dom";
import CrearCompania from "..//Views/Crear/CrearCompania";
import EditarCompania from "../Views/Editar/EditarCompania";

function RouterCompania(){
    return(
        <Routes>
            <Route path="/crear" element={<CrearCompania/>}></Route>
            <Route path="/editar" element={<EditarCompania/>}></Route>

            <Route path="/*" element={<Navigate to="/sync/perfil/home"/>}/>
        </Routes>
    );
};
export default RouterCompania;