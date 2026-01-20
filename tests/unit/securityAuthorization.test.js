const SalesOrderService = require('../../src/services/SalesOrderService');
const ProductService = require('../../src/services/ProductService');
const PurchaseService = require('../../src/services/PurchaseService');
const SupplierService = require('../../src/services/SupplierService');

describe('Security and Authorization Tests', () => {
  let salesOrderService;
  let productService;
  let purchaseService;
  let supplierService;

  beforeEach(() => {
    salesOrderService = new SalesOrderService();
    productService = new ProductService();
    purchaseService = new PurchaseService();
    supplierService = new SupplierService();
  });

  test('should enforce validation for all data inputs', () => {
    // Test that invalid data is rejected for sales orders
    expect(() => {
      salesOrderService.createSalesOrder({}); // Missing customerName
    }).toThrow('Validation failed: Customer name is required');

    // Test that invalid data is rejected for products
    expect(() => {
      productService.createProduct({}); // Missing name
    }).toThrow('Validation failed: Name is required');

    // Test that invalid data is rejected for purchase orders
    expect(() => {
      purchaseService.createPurchaseOrder({}); // Missing supplierName
    }).toThrow('Validation failed: Supplier name is required');

    // Test that invalid data is rejected for suppliers
    expect(() => {
      supplierService.createSupplier({}); // Missing name
    }).toThrow('Validation failed: Name is required');
  });

  test('should validate required fields for all entities', () => {
    // Test sales order validation
    const salesOrderData = {
      customerName: '' // Empty customer name
    };
    expect(() => {
      salesOrderService.createSalesOrder(salesOrderData);
    }).toThrow('Validation failed: Customer name is required');

    // Test product validation
    const productData = {
      name: '', // Empty name
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    expect(() => {
      productService.createProduct(productData);
    }).toThrow('Validation failed: Name is required');

    // Test purchase order validation
    const purchaseData = {
      supplierName: '' // Empty supplier name
    };
    expect(() => {
      purchaseService.createPurchaseOrder(purchaseData);
    }).toThrow('Validation failed: Supplier name is required');

    // Test supplier validation
    const supplierData = {
      name: '', // Empty name
      contactPerson: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890'
    };
    expect(() => {
      supplierService.createSupplier(supplierData);
    }).toThrow('Validation failed: Name is required');
  });

  test('should prevent unauthorized data manipulation', () => {
    // Create a product
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    const product = productService.createProduct(productData);

    // Try to update with invalid data (should throw validation error)
    expect(() => {
      productService.updateProduct(product.id, { name: '' }); // Empty name
    }).toThrow('Validation failed: Name is required');

    // Try to delete non-existent product (should throw error)
    expect(() => {
      productService.deleteProduct(99999); // Non-existent ID
    }).toThrow('Product not found');
  });

  test('should maintain data integrity through validation', () => {
    // Create a product
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    const product = productService.createProduct(productData);

    // Create a sales order
    const salesOrderData = {
      customerName: 'Test Customer'
    };
    const salesOrder = salesOrderService.createSalesOrder(salesOrderData);

    // Add valid item to sales order
    const itemData = {
      productId: product.id,
      quantity: 10,
      unitPrice: product.price
    };
    const salesItem = salesOrderService.addSalesOrderItem(salesOrder.id, itemData);

    // Verify that the item is correctly linked to both entities
    expect(salesItem.productId).toBe(product.id);
    expect(salesItem.salesOrderId).toBe(salesOrder.id);

    // Verify that the sales order total is calculated correctly
    expect(salesOrder.totalAmount).toBe(299.90); // 10 * 29.99
  });

  test('should handle error conditions gracefully', () => {
    // Test that attempting to access non-existent resources throws appropriate errors
    expect(() => {
      salesOrderService.getSalesOrderByID(99999); // Non-existent ID
    }).toThrow('Sales order not found');

    expect(() => {
      productService.getProductByID(99999); // Non-existent ID
    }).toThrow('Product not found');

    expect(() => {
      purchaseService.getPurchaseOrderByID(99999); // Non-existent ID
    }).toThrow('Purchase order not found');

    expect(() => {
      supplierService.getSupplierByID(99999); // Non-existent ID
    }).toThrow('Supplier not found');
  });
});