import React from 'react';
import Counter from './Counter';

const MenuItem = ({ item, onAdd, onRemove }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '200px', textAlign: 'center' }}>
      <img src={item.image} alt={item.name} style={{ width: '100%' }} />
      <h3>{item.name}</h3>
      <p>Price: {item.price}</p>
      <Counter onAdd={() => onAdd(item)} onRemove={() => onRemove(item)} />
    </div>
  );
};

export default MenuItem;
