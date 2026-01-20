const SalesOrderService = require('../../src/services/SalesOrderService');
const ProductService = require('../../src/services/ProductService');
const PurchaseService = require('../../src/services/PurchaseService');

describe('Database Integrity Tests', () => {
  let salesOrderService;
  let productService;
  let purchaseService;

  beforeEach(() => {
    salesOrderService = new SalesOrderService();
    productService = new ProductService();
    purchaseService = new PurchaseService();
  });

  test('should maintain data consistency when creating sales orders', () => {
    // Create a product first
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    const product = productService.createProduct(productData);

    // Create a sales order with the product
    const salesOrderData = {
      customerName: 'Test Customer'
    };
    const salesOrder = salesOrderService.createSalesOrder(salesOrderData);

    // Add item to sales order
    const itemData = {
      productId: product.id,
      quantity: 10,
      unitPrice: product.price
    };
    const salesItem = salesOrderService.addSalesOrderItem(salesOrder.id, itemData);

    // Verify data integrity
    expect(salesItem.salesOrderId).toBe(salesOrder.id);
    expect(salesItem.productId).toBe(product.id);
    expect(salesItem.quantity).toBe(10);
    expect(salesItem.unitPrice).toBe(29.99);

    // Verify sales order total calculation
    expect(salesOrder.totalAmount).toBe(299.90); // 10 * 29.99
  });

  test('should maintain data consistency when creating purchase orders', () => {
    // Create a product first
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    const product = productService.createProduct(productData);

    // Create a purchase order with the product
    const purchaseData = {
      supplierName: 'Test Supplier'
    };
    const purchaseOrder = purchaseService.createPurchaseOrder(purchaseData);

    // Add item to purchase order
    const itemData = {
      productId: product.id,
      quantity: 5,
      unitPrice: product.price
    };
    const purchaseItem = purchaseService.addPurchaseOrderItem(purchaseOrder.id, itemData);

    // Verify data integrity
    expect(purchaseItem.purchaseOrderId).toBe(purchaseOrder.id);
    expect(purchaseItem.productId).toBe(product.id);
    expect(purchaseItem.quantity).toBe(5);
    expect(purchaseItem.unitPrice).toBe(29.99);

    // Verify purchase order total calculation
    expect(purchaseOrder.totalAmount).toBe(149.95); // 5 * 29.99
  });

  test('should maintain data consistency when updating products', () => {
    // Create a product
    const productData = {
      name: 'Original Product',
      sku: 'OP-001',
      price: 15.00,
      stockQuantity: 25
    };
    const originalProduct = productService.createProduct(productData);

    // Update the product
    const updateData = {
      name: 'Updated Product',
      sku: 'UP-001',
      price: 25.00,
      stockQuantity: 30
    };
    const updatedProduct = productService.updateProduct(originalProduct.id, updateData);

    // Verify data integrity
    expect(updatedProduct.id).toBe(originalProduct.id);
    expect(updatedProduct.name).toBe('Updated Product');
    expect(updatedProduct.sku).toBe('UP-001');
    expect(updatedProduct.price).toBe(25.00);
    expect(updatedProduct.stockQuantity).toBe(30);
  });

  test('should maintain data consistency when deleting records', () => {
    // Create a product
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };
    const product = productService.createProduct(productData);

    // Create a sales order with the product
    const salesOrderData = {
      customerName: 'Test Customer'
    };
    const salesOrder = salesOrderService.createSalesOrder(salesOrderData);

    // Add item to sales order
    const itemData = {
      productId: product.id,
      quantity: 10,
      unitPrice: product.price
    };
    salesOrderService.addSalesOrderItem(salesOrder.id, itemData);

    // Delete the product
    productService.deleteProduct(product.id);

    // Verify that associated sales order items are also removed
    const salesItems = salesOrderService.getSalesOrderItemsBySalesOrderId(salesOrder.id);
    expect(salesItems.length).toBe(0);
  });
});