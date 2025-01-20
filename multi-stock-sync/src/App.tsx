import { Routes, Route, Navigate } from 'react-router-dom';
import RouterSync from './views/Sync/Router/RouterSync';
import { AuthRouter } from './auth/Router/AuthRouter';
import { PrivateRouter, PublicRouter } from './router';

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={
        <PublicRouter>
        <AuthRouter />
        </PublicRouter>
      } />

      <Route path="/sync/*" element={
        <PrivateRouter>
          <RouterSync />
        </PrivateRouter>
      } />

      <Route path="/*" element={<Navigate to="/auth" />} />
    </Routes>

  );
}

export default App;