import React, { useState, useEffect } from 'react';

const SalesOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    const mockOrders = [
      { id: 'SO001', customerName: 'John Doe', date: '2023-05-15', status: 'Pending' },
      { id: 'SO002', customerName: 'Jane Smith', date: '2023-05-16', status: 'Confirmed' },
      { id: 'SO003', customerName: 'Bob Johnson', date: '2023-05-17', status: 'Shipped' },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div className="sales-order-list-page">
      <h1>Sales Orders</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>
                <button>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesOrderListPage;