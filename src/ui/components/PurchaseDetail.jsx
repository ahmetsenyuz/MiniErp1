import React from 'react';
import PurchaseItemList from './PurchaseItemList';

const PurchaseDetail = ({ purchase }) => {
  return (
    <div>
      <h2>Purchase Order #{purchase.id}</h2>
      <p>Supplier ID: {purchase.supplierId}</p>
      <p>Status: {purchase.status || 'pending'}</p>
      <p>Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
      
      <h3>Items</h3>
      <PurchaseItemList items={purchase.items || []} />
    </div>
  );
};

export default PurchaseDetail;