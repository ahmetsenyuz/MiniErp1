import React, { useState } from 'react';

const SalesOrderConfirmation = ({ order, onConfirm, onCancel }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = async () => {
    try {
      // Simulate API call for inventory validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call the backend API
      // const response = await fetch('/api/sales-orders/validate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(order)
      // });
      
      // const result = await response.json();
      
      // if (result.success) {
        setIsConfirmed(true);
        onConfirm(order);
      // } else {
      //   alert('Inventory validation failed: ' + result.message);
      // }
    } catch (error) {
      console.error('Error validating inventory:', error);
      alert('Error validating inventory');
    }
  };

  if (isConfirmed) {
    return (
      <div className="confirmation-success">
        <h2>Sales Order Confirmed!</h2>
        <p>Order #{order.id} has been successfully created and inventory updated.</p>
      </div>
    );
  }

  return (
    <div className="sales-order-confirmation">
      <h2>Confirm Sales Order</h2>
      <div className="order-summary">
        <h3>Customer: {order.customerName}</h3>
        <h3>Items:</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.productId} - Qty: {item.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="confirmation-actions">
        <button onClick={handleConfirm}>Confirm Order</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SalesOrderConfirmation;