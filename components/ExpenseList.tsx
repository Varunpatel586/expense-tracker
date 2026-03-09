'use client';

import { Expense } from './ExpenseForm';
import { useCurrency } from '../contexts/CurrencyContext';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const { convertAmount, getCurrencySymbol } = useCurrency();

  const getCategoryColor = (category: Expense['category']) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-800',
      Travel: 'bg-blue-100 text-blue-800',
      Marketing: 'bg-purple-100 text-purple-800',
      Utilities: 'bg-green-100 text-green-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[category];
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses</h3>
      
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base flex-1">No expenses added yet</p>
      ) : (
        <div className="space-y-2 flex-1 overflow-y-auto">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-[#E5E7EB] rounded-md hover:bg-gray-50 transition-colors gap-3"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm sm:text-base">{expense.name}</div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    {getCurrencySymbol()}{convertAmount(expense.amount).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="sm:ml-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors self-end sm:self-auto"
                aria-label="Delete expense"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
