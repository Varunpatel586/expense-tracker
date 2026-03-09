'use client';

import { useState, useEffect } from 'react';

interface ExchangeRates {
  [currency: string]: number;
}

interface CurrencyConverterProps {
  baseAmount: number;
  targetCurrency: string;
  onConvertedAmount: (amount: number) => void;
}

export default function CurrencyConverter({
  baseAmount,
  targetCurrency,
  onConvertedAmount
}: CurrencyConverterProps) {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (err) {
        setError('Unable to fetch exchange rates. Showing USD.');
        console.error('Exchange rate API error:', err);
        
        setExchangeRates({
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
          INR: 83.12
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates[targetCurrency]) {
      const converted = baseAmount * exchangeRates[targetCurrency];
      onConvertedAmount(converted);
    } else if (targetCurrency === 'USD') {
      onConvertedAmount(baseAmount);
    }
  }, [baseAmount, targetCurrency, exchangeRates, onConvertedAmount]);

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500">
        Loading exchange rates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-amber-600">
        {error}
      </div>
    );
  }

  return null;
}
