import React from 'react';
import SupplierForm from '../components/SupplierForm';

const SupplierFormPage = ({ match }) => {
  const supplierId = match?.params?.id;

  const handleSubmit = (supplier) => {
    // Navigate to supplier detail page after successful save
    window.location.href = `/suppliers/${supplier.id}`;
  };

  const handleCancel = () => {
    // Navigate back to supplier list
    window.location.href = '/suppliers';
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>{supplierId ? 'Edit Supplier' : 'Create New Supplier'}</h1>
      </header>

      <main className="page-content">
        <SupplierForm 
          supplierId={supplierId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default SupplierFormPage;