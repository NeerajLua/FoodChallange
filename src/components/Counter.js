import React from 'react';

const Counter = ({ count = 0, onAdd, onRemove }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
      <button onClick={onAdd} style={{ backgroundColor: '#3f51b5', color: '#fff', border: 'none', padding: '0.5rem' }}>+</button>
      <span>{count}</span>
      <button onClick={onRemove} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '0.5rem' }}>-</button>
    </div>
  );
};

export default Counter;
