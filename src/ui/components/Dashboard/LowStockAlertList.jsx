import React from 'react';

const LowStockAlertList = ({ items }) => {
  return (
    <div className="low-stock-alert-list">
      <h3>Low Stock Alerts</h3>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id} className="low-stock-item">
              <span className="product-name">{item.name}</span>
              <span className="stock-quantity">Stock: {item.stock}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No low stock items</p>
      )}
    </div>
  );
};

export default LowStockAlertList;