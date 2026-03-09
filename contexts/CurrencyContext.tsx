'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convertAmount: (amount: number, fromCurrency?: string) => number;
  getCurrencySymbol: (currency?: string) => string;
  convertToUSD: (amount: number, fromCurrency?: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12
  });

  useEffect(() => {
    // Load currency from localStorage on mount
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }

    // Fetch exchange rates
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (response.ok) {
          const data = await response.json();
          setExchangeRates(data.rates);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Keep default rates
      }
    };

    fetchExchangeRates();
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);
  };

  const convertAmount = (amount: number, fromCurrency = 'USD') => {
    if (fromCurrency === currency) return amount;
    
    // Convert from USD to target currency
    const rate = exchangeRates[currency as keyof typeof exchangeRates];
    return rate ? amount * rate : amount;
  };

  const convertToUSD = (amount: number, fromCurrency = currency) => {
    if (fromCurrency === 'USD') return amount;
    
    // Convert from selected currency to USD
    const rate = exchangeRates[fromCurrency as keyof typeof exchangeRates];
    return rate ? amount / rate : amount;
  };

  const getCurrencySymbol = (targetCurrency = currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹'
    };
    return symbols[targetCurrency as keyof typeof symbols] || '$';
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertAmount, getCurrencySymbol, convertToUSD }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
