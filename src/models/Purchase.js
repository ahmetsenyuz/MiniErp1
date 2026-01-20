class Purchase {
  constructor(id, supplierId, status = 'pending') {
    this.id = id;
    this.supplierId = supplierId;
    this.status = status;
    this.items = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(purchase) {
    const errors = [];

    if (!purchase.supplierId) {
      errors.push('Supplier ID is required');
    }

    return errors;
  }
}

module.exports = Purchase;