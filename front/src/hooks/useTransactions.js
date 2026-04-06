import { useEffect, useState } from 'react';
import { transactionService } from '../services/transactionsService';
import { categoryService } from '../services/categoriesService';
import  { accountService } from '../services/accountsService';
export const useTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const cargar = async () => {

        const transactions = await transactionService.getAll();
        const categories = await categoryService.getAll();
        const accounts = await accountService.getAll();
        setTransactions(transactions);
        setCategories(categories);
        setAccounts(accounts);
    }

    useEffect(() => { cargar(); }, []);

    return {
        transactions,
        categories,
        accounts,
    }

};