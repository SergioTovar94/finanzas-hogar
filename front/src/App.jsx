import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; './pages/Register';

import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Register from './pages/Register';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route element={<Layout />}>  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
  );
}

export default App;