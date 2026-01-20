import React, { useState, useEffect } from 'react';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-header">
        <h2>{product.name}</h2>
        <button onClick={() => window.history.back()} className="back-button">
          &larr; Back to List
        </button>
      </div>
      
      <div className="product-info">
        <div className="info-item">
          <strong>SKU:</strong> {product.sku}
        </div>
        <div className="info-item">
          <strong>Price:</strong> ${product.sellingPrice}
        </div>
        <div className="info-item">
          <strong>ID:</strong> {product.id}
        </div>
      </div>
      
      <div className="product-actions">
        <button 
          onClick={() => window.location.href = `/products/${productId}/edit`}
          className="edit-button"
        >
          Edit Product
        </button>
        <button 
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this product?')) {
              try {
                const response = await fetch(`/api/products/${productId}`, {
                  method: 'DELETE'
                });
                
                if (!response.ok) {
                  throw new Error('Failed to delete product');
                }
                
                alert('Product deleted successfully');
                window.location.href = '/products';
              } catch (err) {
                alert(`Error deleting product: ${err.message}`);
              }
            }
          }}
          className="delete-button"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;