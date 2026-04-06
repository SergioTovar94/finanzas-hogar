// components/Transactions/TransactionModal.jsx
import { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

export default function TransactionModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    categoryId: '',
    accountId: '',
    description: '',
    amount: '',
    date: '',
  });
  const { categories, accounts } = useTransactions();

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
          {initialData ? 'Editar transacción' : 'Nuevo egreso'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">¿Qué vas a pagar?</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">¿De qué cuenta saldrá el dinero?</label>
            <select
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              step="0.01"
            />
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
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
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