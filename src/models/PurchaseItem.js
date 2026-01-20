class PurchaseItem {
  constructor(id, purchaseId, productId, quantity, unitPrice) {
    this.id = id;
    this.purchaseId = purchaseId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(purchaseItem) {
    const errors = [];

    if (!purchaseItem.purchaseId) {
      errors.push('Purchase ID is required');
    }

    if (!purchaseItem.productId) {
      errors.push('Product ID is required');
    }

    if (!purchaseItem.quantity || purchaseItem.quantity <= 0) {
      errors.push('Quantity must be a positive number');
    }

    if (!purchaseItem.unitPrice || purchaseItem.unitPrice <= 0) {
      errors.push('Unit price must be a positive number');
    }

    return errors;
  }
}

module.exports = PurchaseItem;