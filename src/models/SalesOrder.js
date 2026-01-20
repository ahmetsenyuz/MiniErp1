class SalesOrder {
  constructor(id, customerName, status = 'pending') {
    this.id = id;
    this.customerName = customerName;
    this.status = status;
    this.items = [];
    this.totalAmount = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(salesOrder) {
    const errors = [];

    if (!salesOrder.customerName || salesOrder.customerName.trim() === '') {
      errors.push('Customer name is required');
    }

    return errors;
  }
}

module.exports = SalesOrder;