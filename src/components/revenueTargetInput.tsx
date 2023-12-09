import React, { useState } from 'react';
import { useTheme } from '@mui/material';

const RevenueTargetInput = ({ onSubmit }) => {
  const [growthExpectation, setGrowthExpectation] = useState('');
  const [exchangeRateExpectation, setExchangeRateExpectation] = useState('');
  const { palette } = useTheme();

  const handleGrowthChange = (event) => {
    setGrowthExpectation(event.target.value);
  };

  const handleExchangeRateChange = (event) => {
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
