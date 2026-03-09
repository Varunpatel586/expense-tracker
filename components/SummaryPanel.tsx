'use client';

import { Expense } from './ExpenseForm';
import { useCurrency } from '../contexts/CurrencyContext';

interface SummaryPanelProps {
  expenses: Expense[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  convertedTotal: number;
}

export default function SummaryPanel({
  expenses,
  selectedCurrency,
  onCurrencyChange,
  convertedTotal
}: SummaryPanelProps) {
  const { getCurrencySymbol } = useCurrency();
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryBreakdown = () => {
    const breakdown = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<Expense['category'], number>);

    return Object.entries(breakdown).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    }));
  };

  const categoryBreakdown = getCategoryBreakdown();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Expenses</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                {getCurrencySymbol(selectedCurrency)}
                {convertedTotal.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500">{selectedCurrency}</span>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EB489] focus:border-transparent bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors appearance-none cursor-pointer pr-10"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-8">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {categoryBreakdown.length > 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {categoryBreakdown.map(({ category, amount, percentage }) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">
                      ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#3EB489] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
