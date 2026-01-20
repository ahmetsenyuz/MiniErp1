const ProductService = require('../../src/services/ProductService');
const Product = require('../../src/models/Product');

describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  test('should create a valid product', () => {
    const productData = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };

    const result = productService.createProduct(productData);

    expect(result).toBeInstanceOf(Product);
    expect(result.name).toBe('Test Product');
    expect(result.sku).toBe('TP-001');
    expect(result.price).toBe(29.99);
    expect(result.stockQuantity).toBe(100);
  });

  test('should reject invalid product data', () => {
    const invalidProductData = {
      // Missing name
      sku: 'TP-002',
      price: 19.99,
      stockQuantity: 50
    };

    expect(() => {
      productService.createProduct(invalidProductData);
    }).toThrow('Validation failed: Name is required');
  });

  test('should update product correctly', () => {
    // First create a product
    const productData = {
      name: 'Original Product',
      sku: 'OP-001',
      price: 15.00,
      stockQuantity: 25
    };
    const product = productService.createProduct(productData);

    const updateData = {
      name: 'Updated Product',
      sku: 'UP-001',
      price: 25.00,
      stockQuantity: 30
    };

    const result = productService.updateProduct(product.id, updateData);

    expect(result.name).toBe('Updated Product');
    expect(result.sku).toBe('UP-001');
    expect(result.price).toBe(25.00);
    expect(result.stockQuantity).toBe(30);
  });

  test('should delete product correctly', () => {
    // First create a product
    const productData = {
      name: 'Test Product',
      sku: 'TP-003',
      price: 39.99,
      stockQuantity: 75
    };
    const product = productService.createProduct(productData);

    const result = productService.deleteProduct(product.id);

    expect(result).toBeUndefined();
    expect(productService.getAllProducts().length).toBe(0);
  });
});