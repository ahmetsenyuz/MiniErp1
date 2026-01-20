import React, { useState, useEffect } from 'react';

const SalesOrderDetailPage = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    const mockOrder = {
      id: orderId || 'SO001',
      customerName: 'John Doe',
      date: '2023-05-15',
      status: 'Pending',
      items: [
        { productId: 'PROD001', productName: 'Widget A', quantity: 2, price: 10.99 },
        { productId: 'PROD002', productName: 'Gadget B', quantity: 1, price: 25.50 }
      ],
      totalAmount: 47.48
    };
    
    setTimeout(() => {
      setOrder(mockOrder);
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="sales-order-detail-page">
      <h1>Sales Order Details</h1>
      
      <div className="order-header">
        <h2>Order #{order.id}</h2>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-total">
        <h3>Total Amount: ${order.totalAmount.toFixed(2)}</h3>
      </div>

      <div className="order-actions">
        <button>Print Order</button>
        <button>Download PDF</button>
      </div>
    </div>
  );
};

export default SalesOrderDetailPage;