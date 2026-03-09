'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    currency: 'USD',
    notifications: true,
    autoBackup: false
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        
        // Apply theme on initial load
        if (parsedSettings.theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#0a0a0a';
          document.body.style.color = '#ededed';
        }
      } catch (error) {
        console.error('Error loading settings from localStorage:', error);
      }
    }
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  const exportData = () => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      const dataStr = JSON.stringify(JSON.parse(savedExpenses), null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `expenses-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your application preferences</p>
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
                <Link href="/analytics" className="flex items-center justify-center lg:justify-start p-3 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden lg:block">Analytics</span>
                </Link>
                <Link href="/expenses" className="flex items-center justify-center lg:justify-start p-3 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden lg:block">Expenses</span>
                </Link>
                <button className="flex items-center justify-center lg:justify-start p-3 rounded-md bg-[#3EB489] text-white whitespace-nowrap">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-3 text-sm font-medium hidden lg:block">Settings</span>
                </button>
              </div>
            </nav>
          </aside>

          <main className="lg:col-span-12 xl:col-span-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3EB489] focus:border-transparent bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors appearance-none cursor-pointer pr-10"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="INR">INR - Indian Rupee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => theme === 'light' ? null : toggleTheme()}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          theme === 'light'
                            ? 'bg-[#3EB489] text-white border-[#3EB489]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => theme === 'dark' ? null : toggleTheme()}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'bg-[#3EB489] text-white border-[#3EB489]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={exportData}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Export Data
                    </button>
                    <div className="text-sm text-gray-600 flex items-center">
                      Download all expenses as JSON file
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={exportData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Export Data
                      </button>
                      <div className="text-sm text-gray-600 flex items-center">
                        Download all expense records as JSON
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">App Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-medium text-gray-900">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Theme</span>
                    <span className="font-medium text-gray-900">{theme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
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
