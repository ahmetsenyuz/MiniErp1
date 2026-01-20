import React from 'react';

const SalesOrderItem = ({ item, onRemove }) => {
  return (
    <div className="sales-order-item">
      <span>{item.productId} - Qty: {item.quantity}</span>
      <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

export default SalesOrderItem;