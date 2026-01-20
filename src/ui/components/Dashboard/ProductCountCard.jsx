import React from 'react';

const ProductCountCard = ({ count }) => {
  return (
    <div className="product-count-card">
      <h3>Total Products</h3>
      <p className="count">{count}</p>
    </div>
  );
};

export default ProductCountCard;