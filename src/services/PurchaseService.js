const Purchase = require('../models/Purchase');
const PurchaseItem = require('../models/PurchaseItem');

class PurchaseService {
  constructor() {
    this.purchases = [];
    this.purchaseItems = [];
    this.nextId = 1;
  }

  async createPurchase(purchaseData) {
    const errors = Purchase.validate(purchaseData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const newPurchase = new Purchase(this.nextId++, purchaseData.supplierId);
    this.purchases.push(newPurchase);
    return newPurchase;
  }

  async getAllPurchases() {
    return this.purchases;
  }

  async getPurchaseById(id) {
    const purchase = this.purchases.find(p => p.id === parseInt(id));
    if (!purchase) {
      throw new Error('Purchase not found');
    }
    return purchase;
  }

  async addPurchaseItem(purchaseId, itemData) {
    const errors = PurchaseItem.validate(itemData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check if purchase exists
    const purchase = this.purchases.find(p => p.id === parseInt(purchaseId));
    if (!purchase) {
      throw new Error('Purchase not found');
    }

    const newItem = new PurchaseItem(
      this.nextId++,
      purchaseId,
      itemData.productId,
      itemData.quantity,
      itemData.unitPrice
    );
    
    this.purchaseItems.push(newItem);
    purchase.updatedAt = new Date();
    
    return newItem;
  }

  async getPurchaseItemsByPurchaseId(purchaseId) {
    return this.purchaseItems.filter(item => item.purchaseId === parseInt(purchaseId));
  }

  async confirmPurchase(purchaseId) {
    const purchase = this.purchases.find(p => p.id === parseInt(purchaseId));
    if (!purchase) {
      throw new Error('Purchase not found');
    }

    // In a real implementation, this would update inventory
    // For now, we'll just mark the purchase as confirmed
    purchase.status = 'confirmed';
    purchase.updatedAt = new Date();
    
    return purchase;
  }

  async updatePurchase(purchaseId, purchaseData) {
    const purchaseIndex = this.purchases.findIndex(p => p.id === parseInt(purchaseId));
    if (purchaseIndex === -1) {
      throw new Error('Purchase not found');
    }

    const errors = Purchase.validate(purchaseData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Update purchase
    this.purchases[purchaseIndex] = {
      ...this.purchases[purchaseIndex],
      ...purchaseData
    };

    return this.purchases[purchaseIndex];
  }

  async deletePurchase(purchaseId) {
    const purchaseIndex = this.purchases.findIndex(p => p.id === parseInt(purchaseId));
    if (purchaseIndex === -1) {
      throw new Error('Purchase not found');
    }

    const deletedPurchase = this.purchases.splice(purchaseIndex, 1)[0];
    // Also remove associated items
    this.purchaseItems = this.purchaseItems.filter(item => item.purchaseId !== parseInt(purchaseId));
    
    return deletedPurchase;
  }
}

module.exports = new PurchaseService();