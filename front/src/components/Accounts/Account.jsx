// components/Transactions/TransactionModal.jsx
import { useState, useEffect } from 'react';
import { useAccounts } from '../../hooks/useAccounts';

export default function TransactionIncome({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    categoryId: '',
    accountId: '',
    description: '',
    amount: '',
    date: '',
  });
  const { accounts, users} = useAccounts();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (initialData) {
      setFormData({
        categoryId: initialData.categoryId || '',
        accountId: initialData.accountId || '',
        description: initialData.description || '',
        amount: initialData.amount || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
      });
    } else {
      const now = new Date();
      setFormData({
        categoryId: '',
        accountId: '',
        description: '',
        amount: '',
        date: today,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      originAccountId: Number(formData.accountId),
      categoryId: Number(formData.categoryId),
      date: formData.date,
      description: formData.description,
      amount: Number(formData.amount),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Editar Cuenta' : 'Nueva Cuenta'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">¿A nombre de quién está la cuenta?</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Banco</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
                <option key="bank" value="Confiar">Confiar</option>
                <option key="bank" value="Daviplata">Daviplata</option>
                <option key="bank" value="Davivienda">Davivienda</option>
                <option key="bank" value="Nequi">Nequi</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Moneda</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
                <option key="currency" value="currency">
                  COP
                </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Saldo inicial</label>
            <input
              type="text"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Cuenta</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
                <option key="type" value="type">Ahorros</option>
                <option key="type" value="type">Corriente</option>
                <option key="type" value="type">Crédito</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}