import { useState } from 'react';
import { useRegistro } from '../hooks/useRegistro';

function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registro, error, isLoading } = useRegistro();

  const handleSubmit = (e) => {
    e.preventDefault();
    registro(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(97%_0.02_318)] to-[oklch(92%_0.05_318)]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Regístrate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[oklch(49.1%_0.27_292.581)] hover:bg-[oklch(42%_0.27_292.581)] text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Cargando...' : 'Regístrate'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/" className="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;