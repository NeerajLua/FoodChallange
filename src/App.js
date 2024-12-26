import React, { useState } from 'react';
import Header from './components/Header';
import MenuItem from './components/MenuItem';
import OrderSummary from './components/OrderSummary';

const App = () => {
  const menu = [
    { id: 1, name: 'Hamburger', price: 200, image: '/hamburger.jpeg' },
    { id: 2, name: 'Fries', price: 100, image: '/fries.jpeg' },
    { id: 3, name: 'Coke', price: 50, image: '/coke.jpeg' },
    { id: 4, name: 'Pepsi', price: 50, image: '/pepsi.jpeg' },
  ];

  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);  // State to toggle menu view
  const [orderComplete, setOrderComplete] = useState(false);  // State to track if the order is completed
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State for login status
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' }); // Form data for signup

  const [formErrors, setFormErrors] = useState({ email: '', password: '', fullName: '' });

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem.quantity === 1) {
        return prev.filter((i) => i.id !== item.id);
      }
      return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i));
    });
  };

  const saveCheckout = () => {
    setOrderComplete(true);  // Mark the order as complete
  };

  const cancelOrder = () => setCart([]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Validate form
  const validateForm = () => {
    let errors = {};
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.fullName) {
      errors.fullName = 'Full name is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoggedIn(true);  // Simulate successful login
    }
  };

  return (
    <div>
      <Header />
      {!isLoggedIn ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>Login or Signup</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                {formErrors.fullName && <p style={{ color: 'red' }}>{formErrors.fullName}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
                />
                {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
              </div>
              <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#3f51b5' }}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      ) : orderComplete ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>Thank You for Your Order.</h1>
        </div>
      ) : (
        !showMenu ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to Food Kitchen</h1>
            <button onClick={() => setShowMenu(true)} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#3f51b5' }}>
              Go to Menu
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '1rem' }}>
              {menu.map((item) => (
                <MenuItem key={item.id} item={item} onAdd={addToCart} onRemove={removeFromCart} />
              ))}
            </div>
            {cart.length > 0 && (
              <OrderSummary cart={cart} onAdd={addToCart} onRemove={removeFromCart} onSave={saveCheckout} onCancel={cancelOrder} />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default App;
