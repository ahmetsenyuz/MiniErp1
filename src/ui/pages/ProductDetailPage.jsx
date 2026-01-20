import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = ({ match }) => {
  const productId = match?.params?.id;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Product Details</h1>
      </header>
      
      <main className="page-content">
        <ProductDetail productId={productId} />
      </main>
    </div>
  );
};

export default ProductDetailPage;