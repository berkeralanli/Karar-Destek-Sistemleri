import { useTheme } from '@mui/material';
import React, { useState } from 'react';

const RevenueTargetInput = ({ onSubmit }) => {
  const [targetRevenue, setTargetRevenue] = useState('');
  const { palette } = useTheme();
  const handleInputChange = (event) => {
    setTargetRevenue(event.target.value);
  };

  const handleSubmit = () => {
    if (targetRevenue) {
      onSubmit(parseInt(targetRevenue));
      setTargetRevenue(''); // Inputu temizle
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <input
        type="number"
        placeholder="Hedef Ciro"
        value={targetRevenue}
        onChange={handleInputChange}
        style={{
          margin: '0.5rem',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          
          fontSize: '12px',
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
