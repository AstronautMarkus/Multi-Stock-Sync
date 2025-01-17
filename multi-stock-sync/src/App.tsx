import { Routes, Route, Navigate } from 'react-router-dom';

import PuntoVentaDashboard from './views/PuntoVenta/Dashboard/PuntoVentaDashboard';
import Despacho from './views/PuntoVenta/Despacho/Despacho';
import Reimprimir from './views/PuntoVenta/Reimprimir/Reimprimir';
import AbonoCliente from './views/PuntoVenta/AbonoCliente/AbonoCliente';
import MovimientosEfectivo from './views/PuntoVenta/MovimientosEfectivo/MovimientosEfectivo';
import Devolucion from './views/PuntoVenta/Devolucion/Devolucion';
import CierreCaja from './views/PuntoVenta/CierreCaja/CierreCaja';
import Maestros from './views/PuntoVenta/Maestros/Maestros';
import Reportes from './views/PuntoVenta/Reportes/Reportes';

import RouterAdmin from './router/RouterAdmin';
import RouterSync from './views/Sync/Router/RouterSync';
import { AuthRouter } from './auth/Router/AuthRouter';

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/punto-venta" element={<PuntoVentaDashboard />} />
      <Route path="/punto-venta/despacho" element={<Despacho />} />
      <Route path="/punto-venta/reimprimir" element={<Reimprimir />} />
      <Route path="/punto-venta/abono-cliente" element={<AbonoCliente />} />
      <Route path="/punto-venta/devolucion" element={<Devolucion />} />
      <Route path="/punto-venta/movimientos-efectivo" element={<MovimientosEfectivo />} />
      <Route path="/punto-venta/cierre-caja" element={<CierreCaja />} />
      <Route path="/punto-venta/reportes" element={<Reportes />} />
      <Route path="/punto-venta/maestros" element={<Maestros />} />

      <Route path="/admin/*" element={<RouterAdmin />} />

      <Route path="/sync/*" element={<RouterSync/>} />

      <Route path="/*" element={<Navigate to="/auth"/>}/>
    </Routes>

  );
}

export default App;