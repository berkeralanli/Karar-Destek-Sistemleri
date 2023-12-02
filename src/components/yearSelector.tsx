import React from 'react';

const YearSelector = ({ onSelectYear }) => {
  const handleChange = (event) => {
    const year = parseInt(event.target.value);
    onSelectYear(year);
  };

  return (
    <div style={{ justifySelf:'en'}}>
      <select onChange={handleChange}
        style={{
          marginLeft:'0.5rem',
          marginTop: '0.4rem',
          padding: '5px',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0', // Arka plan rengi
          border: '1px solid #ccc', // Kenarlık
          color: '#333', // Metin rengi
          fontSize: '12px',
        }}>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
      </select>
    </div>
  );
};

export default YearSelector;