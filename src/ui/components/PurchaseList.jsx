import React from 'react';
import PurchaseItem from './PurchaseItem';

const PurchaseList = ({ purchases }) => {
  if (!purchases || purchases.length === 0) {
    return <div>No purchases found.</div>;
  }

  return (
    <div>
      {purchases.map(purchase => (
        <PurchaseItem key={purchase.id} purchase={purchase} />
      ))}
    </div>
  );
};

export default PurchaseList;