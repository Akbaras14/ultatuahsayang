// components/Apps/Paint.tsx
import React from 'react';

const Paint: React.FC = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0f0f0', fontFamily: '"Segoe UI", sans-serif' }}>
      {/* Paint Toolbar */}
      <div style={{ padding: '5px', background: '#fff', borderBottom: '1px solid #ccc', display: 'flex', gap: '10px' }}>
        <div style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '3px', display: 'flex', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', border: '1px solid #999', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>🖌️</div>
          <div style={{ width: '20px', height: '20px', background: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>🖍️</div>
          <div style={{ width: '20px', height: '20px', background: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>📐</div>
        </div>
        <div style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '3px', display: 'flex', flexWrap: 'wrap', width: '120px', gap: '2px' }}>
          {['#000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4'].map(color => (
            <div key={color} style={{ width: '15px', height: '15px', background: color, border: '1px solid #999' }}></div>
          ))}
        </div>
      </div>

      {/* Drawing Canvas Area */}
      <div style={{ flexGrow: 1, padding: '20px', overflow: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <div style={{ 
          width: '600px', 
          height: '400px', 
          background: 'white', 
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          cursor: 'crosshair',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Heart Shape */}
          <div style={{ 
            position: 'absolute', 
            top: '100px', 
            left: '200px', 
            width: '100px', 
            height: '100px',
            transform: 'rotate(-45deg)',
            background: '#ff4d4d'
          }}>
            <div style={{ position: 'absolute', top: '-50px', left: 0, width: '100px', height: '100px', borderRadius: '50%', background: '#ff4d4d' }}></div>
            <div style={{ position: 'absolute', top: 0, left: '50px', width: '100px', height: '100px', borderRadius: '50%', background: '#ff4d4d' }}></div>
          </div>

          {/* Personalized Message */}
          <div style={{ 
            position: 'absolute', 
            top: '250px', 
            left: '0', 
            width: '100%',
            textAlign: 'center',
            fontSize: '24px', 
            color: '#d63384',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Love You maftukah<br />
            <span style={{ fontSize: '18px' }}>semoga diberikan kesehatan selalu</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ height: '22px', borderTop: '1px solid #ccc', background: '#f0f0f0', fontSize: '11px', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '20px' }}>
        <div>600 x 400 px</div>
        <div>100%</div>
      </div>
    </div>
  );
};

export default Paint;
