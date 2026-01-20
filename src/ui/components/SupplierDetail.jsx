import React, { useState, useEffect } from 'react';

const SupplierDetail = ({ { supplierId } }) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null;

  useEffect(() => {
    fetchSupplier();
  }, [supplierId]);

  const fetchSupplier = async () => {
    if (!supplierId) return;

    try {
      const response = await fetch(`/api/suppliers/${supplierId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch supplier');
      }
      const data = await response.json();
      setSupplier(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading supplier details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!supplier) return <div className="error">Supplier not found</div>;

  return (
    <div className="supplier-detail">
      <div className="supplier-header">
        <h2>{supplier.name}</h2>
        <button onClick={() => window.history.back()} className="back-button">
          &larr; Back to List
        </button>
      </div>

      <div className="supplier-info">
        <div className="info-item">
          <strong>SKU:</strong> {supplier.sku}
        </div>
        <div className="info-item">
          <strong>Phone:</strong> {supplier.phone}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {supplier.email}
        </div>
        <div className="info-item">
          <strong>ID:</strong> {supplier.id}
        </div>
      </div>

      <div className="supplier-actions">
        <button 
          onClick={() => window.location.href = `/suppliers/${supplierId}/edit`}
          className="edit-button"
        >
          Edit Supplier
        </button>
        <button 
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this supplier?')) {
              try {
                const response = await fetch(`/api/suppliers/${supplierId}`, {
                  method: 'DELETE'
                });

                if (!response.ok) {
                  throw new Error('Failed to delete supplier');
                }

                alert('Supplier deleted successfully');
                window.location.href = '/suppliers';
              } catch (err) {
                alert(`Error deleting supplier: ${err.message}`);
              }
            }
          }}
          className="delete-button"
        >
          Delete Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierDetail;