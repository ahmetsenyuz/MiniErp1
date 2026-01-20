import React, { useState } from 'react';
import PurchaseForm from '../components/PurchaseForm';

const PurchaseFormPage = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    items: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create purchase');
      }
      
      const result = await response.json();
      console.log('Purchase created:', result);
      // Redirect or show success message
    } catch (error) {
      console.error('Error creating purchase:', error);
    }
  };

  return (
    <div>
      <h1>Create Purchase Order</h1>
      <PurchaseForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PurchaseFormPage;