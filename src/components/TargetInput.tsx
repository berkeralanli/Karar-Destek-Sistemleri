import { useTheme } from '@mui/material';
import React, { useState } from 'react';

  const RevenueTargetInput = ({ onSubmit }: { onSubmit: (targetRevenue: number) => void }) => {
    const [targetRevenue, setTargetRevenue] = useState<number>(0);
    const { palette } = useTheme();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value); 
      setTargetRevenue(isNaN(value) ? 0 : value); 
    };
  

    const handleSubmit = () => {
      onSubmit(targetRevenue);
    };
  

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <input
        type="number"
        placeholder="Hedef Ciro"
        value={targetRevenue}
        onChange={handleInputChange}
        style={
          {
          margin: '0.5rem',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '12px',
          width:'120px'
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          
          margin: '0.5rem',
          padding: '5px 15px',
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
