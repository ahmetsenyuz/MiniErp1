import React from 'react';
import PurchaseItem from './PurchaseItem';

const PurchaseItemList = ({ items }) => {
  if (!items || items.length === 0) {
    return <div>No items in this purchase.</div>;
  }

  return (
    <div>
      {items.map(item => (
        <PurchaseItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PurchaseItemList;