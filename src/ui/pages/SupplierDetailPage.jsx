import React from 'react';
import SupplierDetail from '../components/SupplierDetail';

const SupplierDetailPage = ({ match }) => {
  const supplierId = match?.params?.id;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Supplier Details</h1>
      </header>

      <main className="page-content">
        <SupplierDetail supplierId={supplierId} />
      </main>
    </div>
  );
};

export default SupplierDetailPage;