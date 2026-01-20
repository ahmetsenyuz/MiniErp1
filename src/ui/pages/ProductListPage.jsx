import React from 'react';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Product Management</h1>
        <button 
          onClick={() => window.location.href = '/products/new'}
          className="create-button"
        >
          + Create New Product
        </button>
      </header>
      
      <main className="page-content">
        <ProductList />
      </main>
    </div>
  );
};

export default ProductListPage;