import React from 'react';
import Counter from './Counter';

const OrderSummary = ({ cart, onAdd, onRemove, onSave, onCancel }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', width: '400px' }}>
      <h2>Order Summary</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.name}</span>
          <Counter
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
            count={item.quantity}
          />
        </div>
      ))}
      <h3>Total (INR): {total}</h3>
      <button onClick={onSave}>Save and Checkout</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default OrderSummary;
