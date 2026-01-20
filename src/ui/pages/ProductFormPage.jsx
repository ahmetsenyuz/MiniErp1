import React from 'react';
import ProductForm from '../components/ProductForm';

const ProductFormPage = ({ match }) => {
  const productId = match?.params?.id;

  const handleSubmit = (product) => {
    // Navigate to product detail page after successful save
    window.location.href = `/products/${product.id}`;
  };

  const handleCancel = () => {
    // Navigate back to product list
    window.location.href = '/products';
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>{productId ? 'Edit Product' : 'Create New Product'}</h1>
      </header>
      
      <main className="page-content">
        <ProductForm 
          productId={productId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default ProductFormPage;