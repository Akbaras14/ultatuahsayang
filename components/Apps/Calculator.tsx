// components/Apps/Calculator.tsx
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');

  const buttons = [
    'MC', 'MR', 'MS', 'M+', 'M-',
    '←', 'CE', 'C', '±', '√',
    '7', '8', '9', '/', '%',
    '4', '5', '6', '*', '1/x',
    '1', '2', '3', '-', '=',
    '0', '.', '+'
  ];

  return (
    <div style={{ padding: '12px', background: 'linear-gradient(to bottom, #f2f7fb, #d9e4ee)', height: '100%', userSelect: 'none', fontFamily: '"Segoe UI", sans-serif' }}>
      <div style={{ 
        background: 'linear-gradient(to bottom, #e5eefb, #ffffff)', 
        border: '1px solid #7187a7', 
        padding: '8px 10px',
        textAlign: 'right',
        fontSize: '28px',
        marginBottom: '15px',
        borderRadius: '3px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#000',
        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
      }}>
        {display}
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '6px' 
      }}>
        {buttons.map(btn => (
          <button 
            key={btn}
            style={{
              height: '35px',
              fontSize: '12px',
              background: btn === '=' 
                ? 'linear-gradient(to bottom, #7db3e8, #3a7ebf)' 
                : 'linear-gradient(to bottom, #ffffff, #e6e6e6)',
              color: btn === '=' ? 'white' : '#1e395b',
              border: '1px solid #707070',
              borderRadius: '3px',
              cursor: 'pointer',
              gridColumn: btn === '0' ? 'span 2' : 'auto',
              gridRow: btn === '=' ? 'span 2' : 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
            onClick={() => {
              if (btn === 'C') setDisplay('0');
              else if (display === '0') setDisplay(btn);
              else setDisplay(display + btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
