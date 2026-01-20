import React, { useState, useEffect } from 'react';

const ProductForm = ({ productId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    sellingPrice: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skuExists, setSkuExists] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        sellingPrice: product.sellingPrice || ''
      });
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (formData.sku.length < 3) {
      newErrors.sku = 'SKU must be at least 3 characters long';
    }
    
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Valid price is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (name === 'sku' && value.trim() && !errors.sku) {
      // Check SKU uniqueness (this would normally be an API call)
      // For demo purposes, we'll simulate checking
      const isUnique = value !== 'EXISTING-SKU'; // Simulated check
      setSkuExists(!isUnique);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (skuExists) {
      setErrors({ sku: 'SKU already exists' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const method = productId ? 'PUT' : 'POST';
      const url = productId ? `/api/products/${productId}` : '/api/products';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save product');
      }
      
      const result = await response.json();
      onSubmit(result);
    } catch (err) {
      console.error('Error saving product:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{productId ? 'Edit Product' : 'Create Product'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="sku">SKU *</label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.sku || skuExists ? 'error' : ''}
        />
        {errors.sku && <span className="error-message">{errors.sku}</span>}
        {skuExists && <span className="error-message">SKU already exists</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="sellingPrice">Selling Price *</label>
        <input
          type="number"
          id="sellingPrice"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.sellingPrice ? 'error' : ''}
        />
        {errors.sellingPrice && <span className="error-message">{errors.sellingPrice}</span>}
      </div>
      
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProductForm;