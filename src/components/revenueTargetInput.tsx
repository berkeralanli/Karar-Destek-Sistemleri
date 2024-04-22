import React, { useState, ChangeEvent } from 'react';
import { useTheme } from '@mui/material';

interface RevenueTargetInputProps {
  onSubmit: (growth: number, exchangeRate: number) => void; // 
}

const RevenueTargetInput: React.FC<RevenueTargetInputProps> = ({ onSubmit }) => { 
  const [growthExpectation, setGrowthExpectation] = useState<string>(''); 
  const [exchangeRateExpectation, setExchangeRateExpectation] = useState<string>('');
  const { palette } = useTheme();

  const handleGrowthChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setGrowthExpectation(event.target.value);
  };

  const handleExchangeRateChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setExchangeRateExpectation(event.target.value);
  };

  const handleSubmit = () => {
    const growth = parseFloat(growthExpectation);
    const exchangeRate = parseFloat(exchangeRateExpectation);

    if (!isNaN(growth) && !isNaN(exchangeRate)) {
      onSubmit(growth, exchangeRate);
      setGrowthExpectation('');
      setExchangeRateExpectation('');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <input
        type="number"
        placeholder="Büyüme Beklentisi (%)"
        value={growthExpectation}
        onChange={handleGrowthChange}
        style={{
          margin: '0.5rem',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '12px',
          width: '150px',
        }}
      />
      <input
        type="number"
        placeholder="Dolar Kuru Beklentisi"
        value={exchangeRateExpectation}
        onChange={handleExchangeRateChange}
        style={{
          margin: '0.5rem',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '12px',
          width: '150px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          margin: '0.5rem',
          padding: '5px 10px',
          borderRadius: '6px',
          backgroundColor: palette.tertiary[500],
          border: '1px solid #ccc',
          fontSize: '12px',
        }}
      >
        Gönder
      </button>
    </div>
  );
};

export default RevenueTargetInput;