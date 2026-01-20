import React from 'react';

const PurchaseItem = ({ purchase }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>Purchase Order #{purchase.id}</h3>
      <p>Supplier ID: {purchase.supplierId}</p>
      <p>Status: {purchase.status || 'pending'}</p>
      <p>Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PurchaseItem;