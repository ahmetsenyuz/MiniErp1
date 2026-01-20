const PurchaseService = require('../../src/services/PurchaseService');
const Purchase = require('../../src/models/Purchase');
const PurchaseItem = require('../../src/models/PurchaseItem');

describe('PurchaseService', () => {
  let purchaseService;

  beforeEach(() => {
    purchaseService = new PurchaseService();
  });

  test('should create a valid purchase order', () => {
    const purchaseData = {
      supplierName: 'John Doe'
    };

    const result = purchaseService.createPurchaseOrder(purchaseData);

    expect(result).toBeInstanceOf(Purchase);
    expect(result.supplierName).toBe('John Doe');
    expect(result.status).toBe('pending');
  });

  test('should reject invalid purchase order data', () => {
    const invalidPurchaseData = {
      // Missing supplierName
    };

    expect(() => {
      purchaseService.createPurchaseOrder(invalidPurchaseData);
    }).toThrow('Validation failed: Supplier name is required');
  });

  test('should add valid item to purchase order', () => {
    // First create an order
    const purchaseData = {
      supplierName: 'Test Supplier'
    };
    const purchase = purchaseService.createPurchaseOrder(purchaseData);
    
    const itemData = {
      productId: 1,
      quantity: 2,
      unitPrice: 10.00
    };

    const result = purchaseService.addPurchaseOrderItem(purchase.id, itemData);
    
    expect(result).toBeInstanceOf(PurchaseItem);
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
      purchaseService.addPurchaseOrderItem(1, invalidItemData);
    }).toThrow('Validation failed: Product ID is required');
  });

  test('should calculate total amount correctly', () => {
    // First create a purchase order
    const purchaseData = {
      supplierName: 'Test Supplier'
    };
    const purchase = purchaseService.createPurchaseOrder(purchaseData);
    
    // Add items
    purchaseService.addPurchaseOrderItem(purchase.id, {
      productId: 1,
      quantity: 2,
      unitPrice: 10.00
    });
    
    purchaseService.addPurchaseOrderItem(purchase.id, {
      productId: 2,
      quantity: 1,
      unitPrice: 15.00
    });

    // The purchase order should now have a total amount of 35.00 (2*10 + 1*15)
    expect(purchase.totalAmount).toBe(35.00);
  });

  test('should confirm purchase order', () => {
    // First create a purchase order
    const purchaseData = {
      supplierName: 'Confirm Test'
    };
    const purchase = purchaseService.createPurchaseOrder(purchaseData);
    
    const result = purchaseService.confirmPurchaseOrder(purchase.id);
    
    expect(result.status).toBe('confirmed');
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  test('should update purchase order', () => {
    // First create a purchase order
    const purchaseData = {
      supplierName: 'Original Supplier'
    };
    const purchase = purchaseService.createPurchaseOrder(purchaseData);
    
    const updateData = {
      supplierName: 'Updated Supplier'
    };

    const result = purchaseService.updatePurchaseOrder(purchase.id, updateData);
    
    expect(result.supplierName).toBe('Updated Supplier');
  });

  test('should delete purchase order', () => {
    // First create a purchase order
    const purchaseData = {
      supplierName: 'Test Supplier'
    };
    const purchase = purchaseService.createPurchaseOrder(purchaseData);
    
    const result = purchaseService.deletePurchaseOrder(purchase.id);
    
    expect(result).toBeUndefined();
    expect(purchaseService.getAllPurchaseOrders().length).toBe(0);
  });
});