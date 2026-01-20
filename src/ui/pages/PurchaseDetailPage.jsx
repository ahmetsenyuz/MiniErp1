import React, { useState, useEffect } from 'react';
import PurchaseDetail from '../components/PurchaseDetail';

const PurchaseDetailPage = ({ match }) => {
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await fetch(`/api/purchases/${match.params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase');
        }
        const data = await response.json();
        setPurchase(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [match.params.id]);

  if (loading) return <div>Loading purchase details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Purchase Order Details</h1>
      {purchase && <PurchaseDetail purchase={purchase} />}
    </div>
  );
};

export default PurchaseDetailPage;