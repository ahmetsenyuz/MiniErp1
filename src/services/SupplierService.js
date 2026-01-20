const Supplier = require('./../models/Supplier');

class SupplierService {
  constructor() {
    this.suppliers = [];
    this.nextId = 1;
  }

  async createSupplier(supplierData) {
    const errors = Supplier.validate(supplierData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check for unique company name
    const existingSupplier = this.suppliers.find(s => s.companyName === supplierData.companyName);
    if (existingSupplier) {
      throw new Error('Supplier with this company name already exists');
    }

    const newSupplier = new Supplier(this.nextId++, supplierData.companyName, supplierData.contactPerson, supplierData.phone, supplierData.email);
    this.suppliers.push(newSupplier);
    return newSupplier;
  }

  async getAllSuppliers() {
    return this.suppliers;
  }

  async getSupplierById(id) {
    const supplier = this.suppliers.find(s => s.id === parseInt(id));
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    return supplier;
  }

  async updateSupplier(id, supplierData) {
    const supplierIndex = this.suppliers.findIndex(s => s.id === parseInt(id));
    if (supplierIndex === -1) {
      throw new Error('Supplier not found');
    }

    const errors = Supplier.validate(supplierData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check for unique company name (excluding the current supplier)
    const existingSupplier = this.suppliers.find(s => s.companyName === supplierData.companyName && s.id !== parseInt(id));
    if (existingSupplier) {
      throw new Error('Supplier with this company name already exists');
    }

    // Update supplier
    this.suppliers[supplierIndex] = {
      ...this.suppliers[supplierIndex],
      ...supplierData
    };

    return this.suppliers[supplierIndex];
  }

  async deleteSupplier(id) {
    const supplierIndex = this.suppliers.findIndex(s => s.id === parseInt(id));
    if (supplierIndex === -1) {
      throw new Error('Supplier not found');
    }

    const deletedSupplier = this.suppliers.splice(supplierIndex, 1)[0];
    return deletedSupplier;
  }
}

module.exports = new SupplierService();