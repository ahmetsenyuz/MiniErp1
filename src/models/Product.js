class Product {
  constructor(id, name, sku, sellingPrice) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.sellingPrice = sellingPrice;
  }

  static validate(product) {
    const errors = [];

    if (!product.name || product.name.trim() === '') {
      errors.push('Product name is required');
    }

    if (!product.sku || product.sku.trim() === '') {
      errors.push('SKU is required');
    }

    if (!product.sellingPrice || product.sellingPrice <= 0) {
      errors.push('Selling price must be a positive number');
    }

    return errors;
  }
}

module.exports = Product;