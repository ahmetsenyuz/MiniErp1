import React, { useState, useEffect } from 'react';

const SupplierForm = ({ supplierId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skuExists, setSkuExists] = useState(false);

  useEffect(() => {
    if (supplierId) {
      fetchSupplier(supplierId);
    }
  }, [supplierId]);

  const fetchSupplier = async (id) => {
    try {
      const response = await fetch(`/api/suppliers/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch supplier');
      }
      const supplier = await response.json();
      setFormData({
        name: supplier.name || '',
        sku: supplier.sku || '',
        phone: supplier.phone || '',
        email: supplier.email || ''
      });
    } catch (err) {
      console.error('Error fetching supplier:', err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Supplier name is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (formData.sku.length < 3) {
      newErrors.sku = 'SKU must be at least 3 characters long';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
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
      const method = supplierId ? 'PUT' : 'POST';
      const url = supplierId ? `/api/suppliers/${supplierId}` : '/api/suppliers';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save supplier');
      }

      const result = await response.json();
      onSubmit(result);
    } catch (err) {
      console.error('Error saving supplier:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="supplier-form">
      <h2>{supplierId ? 'Edit Supplier' : 'Create Supplier'}</h2>

      <div className="form-group">
        <label htmlFor="name">Supplier Name *</label>
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
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Supplier'}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SupplierForm;