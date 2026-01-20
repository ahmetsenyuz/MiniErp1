class SalesOrderItem {
  constructor(id, salesOrderId, productId, quantity, unitPrice) {
    this.id = id;
    this.salesOrderId = salesOrderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(salesOrderItem) {
    const errors = [];

    if (!salesOrderItem.salesOrderId) {
      errors.push('Sales Order ID is required');
    }

    if (!salesOrderItem.productId) {
      errors.push('Product ID is required');
    }

    if (!salesOrderItem.quantity || salesOrderItem.quantity <= 0) {
      errors.push('Quantity must be a positive number');
    }

    if (!salesOrderItem.unitPrice || salesOrderItem.unitPrice <= 0) {
      errors.push('Unit price must be a positive number');
    }

    return errors;
  }
}

module.exports = SalesOrderItem;