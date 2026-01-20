import React, { useState } from 'react';

const SalesOrderForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    if (selectedProduct && quantity > 0) {
      const newItem = {
        id: Date.now(),
        productId: selectedProduct,
        quantity: parseInt(quantity)
      };
      setItems([...items, newItem]);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerName && items.length > 0) {
      onSubmit({
        customerName,
        items
      });
    }
  };

  return (
    <div className="sales-order-form">
      <h2>Create Sales Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name *</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product">Select Product</label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Choose a product</option>
            <option value="prod1">Product 1</option>
            <option value="prod2">Product 2</option>
            <option value="prod3">Product 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleAddItem}>Add Item</button>

        <div className="items-list">
          <h3>Order Items</h3>
          {items.map((item) => (
            <div key={item.id} className="item-row">
              <span>{item.productId} - Qty: {item.quantity}</span>
              <button type="button" onClick={() => setItems(items.filter(i => i.id !== item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default SalesOrderForm;