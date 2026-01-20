const Product = require('../models/Product');

class ProductService {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  async createProduct(productData) {
    const errors = Product.validate(productData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check for SKU uniqueness
    const existingProduct = this.products.find(p => p.sku === productData.sku);
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }

    const newProduct = new Product(this.nextId++, productData.name, productData.sku, productData.sellingPrice);
    this.products.push(newProduct);
    return newProduct;
  }

  async getAllProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async updateProduct(id, productData) {
    const productIndex = this.products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const errors = Product.validate(productData);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Check for SKU uniqueness (excluding the current product)
    const existingProduct = this.products.find(p => p.sku === productData.sku && p.id !== parseInt(id));
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }

    // Update product
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...productData
    };

    return this.products[productIndex];
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    return deletedProduct;
  }
}

module.exports = new ProductService();