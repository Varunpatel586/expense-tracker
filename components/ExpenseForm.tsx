'use client';

import { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';
}

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Food');
  const { getCurrencySymbol, currency } = useCurrency();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !amount || parseFloat(amount) <= 0) {
      return;
    }

    onAddExpense({
      name: name.trim(),
      amount: parseFloat(amount),
      category
    });

    setName('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EB489] focus:border-transparent bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
            placeholder="Expense name"
          />
        </div>
        
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount ({currency})
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              {getCurrencySymbol()}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              className="w-full pl-8 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EB489] focus:border-transparent bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2 lg:col-span-1 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Expense['category'])}
            className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EB489] focus:border-transparent bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors appearance-none cursor-pointer pr-10"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Marketing">Marketing</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-8">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="sm:col-span-2 lg:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full bg-[#3EB489] text-white px-4 py-2.5 rounded-lg hover:bg-[#339670] transition-colors font-medium text-sm hover:shadow-md"
          >
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
}
