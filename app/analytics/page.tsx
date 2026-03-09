'use client';

import Link from 'next/link';
import { Expense } from '../../components/ExpenseForm';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useExpenses } from '../../contexts/ExpenseContext';

export default function AnalyticsPage() {
  const { convertAmount, getCurrencySymbol } = useCurrency();
  const { expenses, totalExpenses } = useExpenses();

  const convertedTotal = convertAmount(totalExpenses);

  const getCategoryStats = () => {
    const stats = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<Expense['category'], number>);

    return Object.entries(stats)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        count: expenses.filter(e => e.category === category).length
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getMonthlyStats = () => {
    const monthlyData = expenses.reduce((acc, expense) => {
      const date = new Date();
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthlyData)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months
  };

  const categoryStats = getCategoryStats();
  const monthlyStats = getMonthlyStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Detailed insights into your spending patterns</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <aside className="lg:col-span-2">
            <nav className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex flex-row lg:flex-col justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto lg:overflow-x-visible">
                <Link href="/" className="flex items-center justify-center lg:justify-start p-3 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden lg:block">Dashboard</span>
                </Link>
                <button className="flex items-center justify-center lg:justify-start p-3 rounded-md bg-[#3EB489] text-white whitespace-nowrap">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium hidden lg:block">Analytics</span>
                </button>
                <Link href="/expenses" className="flex items-center justify-center lg:justify-start p-3 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden lg:block">Expenses</span>
                </Link>
                <Link href="/settings" className="flex items-center justify-center lg:justify-start p-3 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden lg:block">Settings</span>
                </Link>
              </div>
            </nav>
          </aside>

          <main className="lg:col-span-12 xl:col-span-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-2">Total Spent</div>
                  <div className="text-2xl font-bold text-gray-900">{getCurrencySymbol()}{convertedTotal.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mt-1">All time</div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-2">Transactions</div>
                  <div className="text-2xl font-bold text-gray-900">{expenses.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Total count</div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-2">Average</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {getCurrencySymbol()}{expenses.length > 0 ? (convertedTotal / expenses.length).toFixed(2) : '0.00'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Per transaction</div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <div className="text-sm text-gray-600 mb-2">Categories</div>
                  <div className="text-2xl font-bold text-gray-900">{categoryStats.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Active categories</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {categoryStats.map(({ category, amount, percentage }) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{category}</span>
                            <span className="text-sm text-gray-600">
                              {getCurrencySymbol()}{convertAmount(amount).toFixed(2)} ({percentage.toFixed(1)}%)
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

                <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                  <div className="space-y-3">
                    {categoryStats.slice(0, 5).map(({ category, amount, percentage }, index) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#3EB489] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{category}</div>
                            <div className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{getCurrencySymbol()}{convertAmount(amount).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
