const SalesOrder = require('../models/SalesOrder');
const SalesOrderItem = require('../models/SalesOrderItem');

class SalesOrderService {
  constructor() {
    this.salesOrders = [];
    this.salesOrderItems = [];
    this.nextId = 1;
  }

  async createSalesOrder(salesOrderData) {
    const errors = SalesOrder.validate(salesOrderData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const newSalesOrder = new SalesOrder(this.nextId++, salesOrderData.customerName);
    this.salesOrders.push(newSalesOrder);
    return newSalesOrder;
  }

  async getAllSalesOrders() {
    return this.salesOrders;
  }

  async getSalesOrderById(id) {
    const salesOrder = this.salesOrders.find(s => s.id === parseInt(id));
    if (!salesOrder) {
      throw new Error('Sales order not found');
    }
    return salesOrder;
  }

  async addSalesOrderItem(salesOrderId, itemData) {
    const errors = SalesOrderItem.validate(itemData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check if sales order exists
    const salesOrder = this.salesOrders.find(s => s.id === parseInt(salesOrderId));
    if (!salesOrder) {
      throw new Error('Sales order not found');
    }

    const newItem = new SalesOrderItem(
      this.nextId++,
      salesOrderId,
      itemData.productId,
      itemData.quantity,
      itemData.unitPrice
    );

    this.salesOrderItems.push(newItem);
    salesOrder.updatedAt = new Date();
    
    // Calculate total amount
    const orderItems = this.salesOrderItems.filter(item => item.salesOrderId === parseInt(salesOrderId));
    salesOrder.totalAmount = orderItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);

    return newItem;
  }

  async getSalesOrderItemsBySalesOrderId(salesOrderId) {
    return this.salesOrderItems.filter(item => item.salesOrderId === parseInt(salesOrderId));
  }

  async confirmSalesOrder(salesOrderId) {
    const salesOrder = this.salesOrders.find(s => s.id === parseInt(salesOrderId));
    if (!salesOrder) {
      throw new Error('Sales order not found');
    }

    // In a real implementation, this would update inventory
    // For now, we'll just mark the sales order as confirmed
    salesOrder.status = 'confirmed';
    salesOrder.updatedAt = new Date();

    return salesOrder;
  }

  async updateSalesOrder(salesOrderId, salesOrderData) {
    const salesOrderIndex = this.salesOrders.findIndex(s => s.id === parseInt(salesOrderId));
    if (salesOrderIndex === -1) {
      throw new Error('Sales order not found');
    }

    const errors = SalesOrder.validate(salesOrderData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Update sales order
    this.salesOrders[salesOrderIndex] = {
      ...this.salesOrders[salesOrderIndex],
      ...salesOrderData
    };

    return this.salesOrders[salesOrderIndex];
  }

  async deleteSalesOrder(salesOrderId) {
    const salesOrderIndex = this.salesOrders.findIndex(s => s.id === parseInt(salesOrderId));
    if (salesOrderIndex === -1) {
      throw new Error('Sales order not found');
    }

    const deletedSalesOrder = this.salesOrders.splice(salesOrderIndex, 1)[0];
    // Also remove associated items
    this.salesOrderItems = this.salesOrderItems.filter(item => item.salesOrderId !== parseInt(salesOrderId));

    return deletedSalesOrder;
  }
}

module.exports = new SalesOrderService();