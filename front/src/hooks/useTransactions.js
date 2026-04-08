import { useEffect, useState } from "react";
import { transactionService } from "../services/transactionsService";
import { categoryService } from "../services/categoriesService";
import { accountService } from "../services/accountsService";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [catIncome, setCatIncome] = useState([]);
    const [catExpense, setCatExpense] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarTodo = async () => {
        setLoading(true);
        try {
            const transacciones = await transactionService.getAll();
            const income = await categoryService.getAll({ "type": 'INCOME' });
            const expense = await categoryService.getAll({ "type": 'EXPENSE' });
            const cuentas = await accountService.getAll();
            setTransactions(transacciones);
            setCatIncome(income);
            setCatExpense(expense);
            setAccounts(cuentas);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createTransaction = async (data) => {
        try {
            await transactionService.create(data);
            await cargarTodo();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateTransaction = async (id, data) => {
        try {
            //await transactionService.update(id, data);
            await cargarTodo();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await transactionService.delete(id);
            await cargarTodo();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        cargarTodo();
    }, []);

    return {
        transactions,
        catIncome,
        catExpense,
        accounts,
        loading,
        error,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        recargar: cargarTodo,
    };
};
