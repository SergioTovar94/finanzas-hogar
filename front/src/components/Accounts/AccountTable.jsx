export default function AccountTable({ accounts, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Banco
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Tipo
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Moneda
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {accounts.map((ac) => (
            <tr key={ac.userId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {ac.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {ac.bank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {ac.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {ac.balance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {ac.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                <button
                  onClick={() => onEdit(ac)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(ac.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}