import React, { useState } from 'react';

const PurchaseForm = ({ formData, handleInputChange, handleSubmit }) => {
  const [itemForm, setItemForm] = useState({
    productId: '',
    quantity: '',
    unitPrice: ''
  });

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItem = () => {
    if (itemForm.productId && itemForm.quantity && itemForm.unitPrice) {
      const newItem = {
        id: Date.now(), // Simple ID generation
        productId: itemForm.productId,
        quantity: parseInt(itemForm.quantity),
        unitPrice: parseFloat(itemForm.unitPrice)
      };
      
      handleInputChange({
        target: {
          name: 'items',
          value: [...formData.items, newItem]
        }
      });
      
      setItemForm({ productId: '', quantity: '', unitPrice: '' });
    }
  };

  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    handleInputChange({
      target: {
        name: 'items',
        value: newItems
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Supplier ID:</label>
        <input
          type="text"
          name="supplierId"
          value={formData.supplierId}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <h3>Items</h3>
        <div>
          <input
            type="text"
            name="productId"
            placeholder="Product ID"
            value={itemForm.productId}
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={itemForm.quantity}
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={itemForm.unitPrice}
            onChange={handleItemChange}
          />
          <button type="button" onClick={addItem}>Add Item</button>
        </div>
        
        {formData.items.map((item, index) => (
          <div key={item.id}>
            <span>{item.productId} - Qty: {item.quantity} - ${item.unitPrice}</span>
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
      </div>

      <button type="submit">Create Purchase</button>
    </form>
  );
};

export default PurchaseForm;