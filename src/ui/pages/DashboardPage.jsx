import React, { useState, useEffect } from 'react';
import ProductCountCard from '../components/Dashboard/ProductCountCard';
import LowStockAlertList from '../components/Dashboard/LowStockAlertList';
import DailySalesSummary from '../components/Dashboard/DailySalesSummary';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in a real app this would come from API endpoints
  useEffect(() => {
    const mockProducts = [
      { id: 'P001', name: 'Laptop', sku: 'LAP001', stock: 15, category: 'Electronics' },
      { id: 'P002', name: 'T-Shirt', sku: 'TSH001', stock: 2, category: 'Clothing' },
      { id: 'P003', name: 'Desk Chair', sku: 'CHA001', stock: 5, category: 'Home' },
      { id: 'P004', name: 'Smartphone', sku: 'SMR001', stock: 0, category: 'Electronics' },
      { id: 'P005', name: 'Jeans', sku: 'JEAN001', stock: 8, category: 'Clothing' },
    ];

    const mockSales = [
      { id: 'S001', amount: 1250.75, date: '2023-05-15' },
      { id: 'S002', amount: 899.50, date: '2023-05-15' },
      { id: 'S003', amount: 2450.00, date: '2023-05-15' },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setSales(mockSales);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Calculate total products
  const totalProducts = products.length;

  // Calculate low stock items (stock <= 5)
  const lowStockItems = products.filter(product => product.stock <= 5);

  // Calculate daily sales revenue
  const dailySalesRevenue = sales.reduce((total, sale) => total + sale.amount, 0);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <main className="dashboard-content">
        <div className="metrics-grid">
          <ProductCountCard count={totalProducts} />
          <DailySalesSummary revenue={dailySalesRevenue} />
          <LowStockAlertList items={lowStockItems} />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;