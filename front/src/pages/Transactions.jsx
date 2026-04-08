import { useState, useEffect } from 'react';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionIncome from '../components/Transactions/TransactionIncome';
import TransactionExpense from '../components/Transactions/TransactionExpense'
import Account from '../components/Accounts/Account';
import MonthSelector from '../components/common/MonthSelector';
import { useTransactions } from '../hooks/useTransactions';

function Transactions() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const {
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const handleAddIncome = () => {
    setEditingTransaction(null);
    setIsIncomeOpen(true);
  };

  const handleAddExpense = () => {
    setEditingTransaction(null);
    setIsExpenseOpen(true);
  };

  const handleAccount = () => {
    setEditingTransaction(null);
    setIsAccount(true);
  };


  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta transacción?')) {
      await deleteTransaction(id);
    }
  };

  const handleSave = async (transactionData) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, transactionData);
    } else {
      await createTransaction(transactionData);
    }
    setIsModalOpen(false);
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transacciones</h1>
        <div className="flex gap-3">
          <MonthSelector currentDate={currentDate} onChange={setCurrentDate} />
          <button
            onClick={handleAddExpense}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            - Reg. Egreso
          </button>
          <button
            onClick={handleAddIncome}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Reg. Ingreso
          </button>
          <button
            onClick={handleAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar Cuenta
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TransactionTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TransactionIncome
        isOpen={isIncomeOpen}
        onClose={() => setIsIncomeOpen(false)}
        onSave={handleSave}
        initialData={editingTransaction}
      />
      <TransactionExpense
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        onSave={handleSave}
        initialData={editingTransaction}
      />
      <Account
        isOpen={isAccount}
        onClose={() => setIsAccount(false)}
        onSave={handleSave}
        initialData={editingTransaction}
      />
    </div>
  );
}

export default Transactions;