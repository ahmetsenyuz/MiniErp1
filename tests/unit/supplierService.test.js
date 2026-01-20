const SupplierService = require('../../src/services/SupplierService');
const Supplier = require('../../src/models/Supplier');

describe('SupplierService', () => {
  let supplierService;

  beforeEach(() => {
    supplierService = new SupplierService();
  });

  test('should create a valid supplier', () => {
    const supplierData = {
      name: 'Test Supplier',
      contactPerson: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890'
    };

    const result = supplierService.createSupplier(supplierData);

    expect(result).toBeInstanceOf(Supplier);
    expect(result.name).toBe('Test Supplier');
    expect(result.contactPerson).toBe('John Doe');
    expect(result.email).toBe('john@test.com');
    expect(result.phone).toBe('123-456-7890');
  });

  test('should reject invalid supplier data', () => {
    const invalidSupplierData = {
      // Missing name
      contactPerson: 'Jane Smith',
      email: 'jane@test.com',
      phone: '098-765-4321'
    };

    expect(() => {
      supplierService.createSupplier(invalidSupplierData);
    }).toThrow('Validation failed: Name is required');
  });

  test('should update supplier correctly', () => {
    // First create a supplier
    const supplierData = {
      name: 'Original Supplier',
      contactPerson: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890'
    };
    const supplier = supplierService.createSupplier(supplierData);

    const updateData = {
      name: 'Updated Supplier',
      contactPerson: 'Jane Smith',
      email: 'jane@test.com',
      phone: '098-765-4321'
    };

    const result = supplierService.updateSupplier(supplier.id, updateData);

    expect(result.name).toBe('Updated Supplier');
    expect(result.contactPerson).toBe('Jane Smith');
    expect(result.email).toBe('jane@test.com');
    expect(result.phone).toBe('098-765-4321');
  });

  test('should delete supplier correctly', () => {
    // First create a supplier
    const supplierData = {
      name: 'Test Supplier',
      contactPerson: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890'
    };
    const supplier = supplierService.createSupplier(supplierData);

    const result = supplierService.deleteSupplier(supplier.id);

    expect(result).toBeUndefined();
    expect(supplierService.getAllSuppliers().length).toBe(0);
  });
});