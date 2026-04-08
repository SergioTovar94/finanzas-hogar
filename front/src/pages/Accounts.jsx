import { useState, useEffect } from 'react';
import Account from '../components/Accounts/Account';
import { useAccounts } from '../hooks/useAccounts';
import AccountTable from '../components/Accounts/AccountTable';
function Accounts() {

    const [isAccount, setIsAccount] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);

    const { accounts, users, loading} = useAccounts();
    
    const handleAccount = () => {
    setIsAccount(true);
  };

  const handleEdit = (transaction) => {
  };

  const handleSave = async (transactionData) => {

  };

  const handleDelete = async (id) => {
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cuentas inscritas</h1>
        <button
            onClick={handleAccount}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar Cuenta
          </button>
      </div>
      {loading ? (
              <p>Cargando...</p>
            ) : (
              <AccountTable
                accounts={accounts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
      <div>
        <Account
        isOpen={isAccount}
        onClose={() => setIsAccount(false)}
        onSave={handleSave}
        initialData={editingAccount}
      />
      </div>
    </div>
    
  );
}

export default Accounts;