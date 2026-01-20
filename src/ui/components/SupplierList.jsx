import React, { useState, useEffect } from 'react';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const data = await response.json();
      setSuppliers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          supplier.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? supplier.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="loading">Loading suppliers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="supplier-list">
      <h2>Supplier Catalog</h2>

      {/* Search and Filter Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select 
          value={filterCategory} 
          onChange={handleFilterChange}
          className="category-filter"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {/* Suppliers Grid */}
      <div className="suppliers-grid">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="supplier-card">
            <h3>{supplier.name}</h3>
            <p>SKU: {supplier.sku}</p>
            <p>Phone: {supplier.phone}</p>
            <p>Email: {supplier.email}</p>
            <button onClick={() => window.location.href = `/suppliers/${supplier.id}`}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierList;