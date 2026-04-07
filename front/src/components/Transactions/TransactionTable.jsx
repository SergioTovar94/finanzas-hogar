export default function TransactionTable({ transactions, onEdit, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay transacciones para este mes. ¡Agrega una!
      </div>
    );
  }
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Categoría
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Monto
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Fecha
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {tx.tipo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {tx.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                ${tx.monto?.toLocaleString() ?? tx.amount?.toLocaleString() ?? 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {tx.fecha || tx.transactionDate?.split("T")[0] || ""}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                <button
                  onClick={() => onEdit(tx)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(tx.id)}
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