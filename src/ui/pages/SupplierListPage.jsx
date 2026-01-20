import React from 'react';
import SupplierList from '../components/SupplierList';

const SupplierListPage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Supplier Management</h1>
        <button 
          onClick={() => window.location.href = '/suppliers/new'}
          className="create-button"
        >
          + Create New Supplier
        </button>
      </header>

      <main className="page-content">
        <SupplierList />
      </main>
    </div>
  );
};

export default SupplierListPage;