import React, { useState, useEffect } from 'react';
import PurchaseList from '../components/PurchaseList';

const PurchaseListPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch('/api/purchases');
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await response.json();
        setPurchases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) return <div>Loading purchases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Purchase Orders</h1>
      <PurchaseList purchases={purchases} />
    </div>
  );
};

export default PurchaseListPage;