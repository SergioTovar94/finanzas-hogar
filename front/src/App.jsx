import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';

import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<Layout />}>  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cuentas" element={<Accounts />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="/conf" element={<Settings />} />
        </Route>
      </Routes>
  );
}

export default App;