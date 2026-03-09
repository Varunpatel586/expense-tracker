'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  totalExpenses: number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // Load expenses from localStorage on mount
    const loadExpenses = () => {
      try {
        const savedExpenses = localStorage.getItem('expenses');
        console.log('ExpenseContext: Loading expenses from localStorage:', savedExpenses);
        if (savedExpenses) {
          const parsedExpenses = JSON.parse(savedExpenses);
          console.log('ExpenseContext: Parsed expenses:', parsedExpenses);
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error('ExpenseContext: Error loading expenses from localStorage:', error);
      }
    };

    loadExpenses();

    // Listen for storage changes (in case another tab modifies the data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'expenses') {
        loadExpenses();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // Save expenses to localStorage whenever they change
    console.log('ExpenseContext: Saving expenses to localStorage:', expenses);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    console.log('ExpenseContext: Adding new expense:', newExpense);
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    console.log('ExpenseContext: Deleting expense:', id);
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, totalExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
