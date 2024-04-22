import React, { ChangeEvent } from 'react';

interface YearSelectorProps {
  onSelectYear: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ onSelectYear }) => { 
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => { 
    const year = parseInt(event.target.value);
    onSelectYear(year);
  };

  return (
    
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      <select onChange={handleChange}
        style={{
          marginRight:'0.5rem',
          marginBottom: '-1rem',
          marginTop: '0.5rem',
          padding: '5px',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc', 
          color: '#333', 
          fontSize: '11px',
        }}>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
      </select>
    </div>
  );
};

export default YearSelector;