import { useEffect, useState } from "react";

import { accountService } from "../services/accountsService";
import { userService } from "../services/userService";

export const useAccounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarTodo = async () => {
        setLoading(true);
        try {
            const accounts = await accountService.getAll();
            const users = await userService.getAll();
            setAccounts(accounts);
            setUsers(users);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createAccount = async (data) => {
        try {
            await accountService.create(data);
            await cargarTodo();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateAccount = async (id, data) => {
        try {
            //await transactionService.update(id, data);
            await cargarTodo();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteAccount = async (id) => {
        try {
            await accountService.delete(id);
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
        users,
        accounts,
        loading,
        error,
        createAccount,
        updateAccount,
        deleteAccount,
        recargar: cargarTodo,
    };

};