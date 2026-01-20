const SalesOrderService = require('../../src/services/SalesOrderService');
const SalesOrder = require('../../src/models/SalesOrder');
const SalesOrderItem = require('../../src/models/SalesOrderItem');

describe('SalesOrderService', () => {
  let salesOrderService;

  beforeEach(() => {
    salesOrderService = new SalesOrderService();
  });

  test('should create a valid sales order', () => {
    const orderData = {
      customerName: 'John Doe'
    };

    const result = salesOrderService.createSalesOrder(orderData);
    
    expect(result).toBeInstanceOf(SalesOrder);
    expect(result.customerName).toBe('John Doe');
    expect(result.status).toBe('pending');
  });

  test('should reject invalid sales order data', () => {
    const invalidOrderData = {
      // Missing customerName
    };

    expect(() => {
      salesOrderService.createSalesOrder(invalidOrderData);
    }).toThrow('Validation failed: Customer name is required');
  });

  test('should add valid item to sales order', () => {
    // First create an order
    const orderData = {
      customerName: 'Test Customer'
    };
    const order = salesOrderService.createSalesOrder(orderData);
    
    const itemData = {
      productId: 1,
      quantity: 2,
      unitPrice: 10.00
    };

    const result = salesOrderService.addSalesOrderItem(order.id, itemData);
    
    expect(result).toBeInstanceOf(SalesOrderItem);
    expect(result.productId).toBe(1);
    expect(result.quantity).toBe(2);
    expect(result.unitPrice).toBe(10.00);
  });

  test('should reject invalid item data', () => {
    const invalidItemData = {
      // Missing productId
      quantity: 2,
      unitPrice: 10.00
    };

    expect(() => {
      salesOrderService.addSalesOrderItem(1, invalidItemData);
    }).toThrow('Validation failed: Product ID is required');
  });

  test('should calculate total amount correctly', () => {
    // First create an order
    const orderData = {
      customerName: 'Test Customer'
    };
    const order = salesOrderService.createSalesOrder(orderData);
    
    // Add items
    salesOrderService.addSalesOrderItem(order.id, {
      productId: 1,
      quantity: 2,
      unitPrice: 10.00
    });
    
    salesOrderService.addSalesOrderItem(order.id, {
      productId: 2,
      quantity: 1,
      unitPrice: 15.00
    });

    // The order should now have a total amount of 35.00 (2*10 + 1*15)
    expect(order.totalAmount).toBe(35.00);
  });

  test('should confirm sales order', () => {
    // First create an order
    const orderData = {
      customerName: 'Test Customer'
    };
    const order = salesOrderService.createSalesOrder(orderData);
    
    const result = salesOrderService.confirmSalesOrder(order.id);
    
    expect(result.status).toBe('confirmed');
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  test('should update sales order', () => {
    // First create an order
    const orderData = {
      customerName: 'Original Customer'
    };
    const order = salesOrderService.createSalesOrder(orderData);
    
    const updateData = {
      customerName: 'Updated Customer'
    };
    
    const result = salesOrderService.updateSalesOrder(order.id, updateData);
    
    expect(result.customerName).toBe('Updated Customer');
  });

  test('should delete sales order', () => {
    // First create an order
    const orderData = {
      customerName: 'Test Customer'
    };
    const order = salesOrderService.createSalesOrder(orderData);
    
    const result = salesOrderService.deleteSalesOrder(order.id);
    
    expect(result).toBeDefined();
    expect(salesOrderService.getAllSalesOrders().length).toBe(0);
  });
});