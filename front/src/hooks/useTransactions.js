import { useEffect, useState } from "react";
import { transactionService } from "../services/transactionsService";
import { categoryService } from "../services/categoriesService";
import { accountService } from "../services/accountsService";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarTodo = async () => {
        setLoading(true);
        try {
            const transacciones = await transactionService.getAll();
            const categorias = await categoryService.getAll();
            const cuentas = await accountService.getAll();
            setTransactions(transacciones);
            setCategories(categorias);
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
        categories,
        accounts,
        loading,
        error,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        recargar: cargarTodo,
    };
};
