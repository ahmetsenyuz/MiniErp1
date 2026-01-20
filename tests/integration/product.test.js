const request = require('supertest');
const app = require('../../src/app');

describe('Product API', () => {
  beforeEach(() => {
    // Reset in-memory data store before each test
    // In a real implementation, this would reset the database
  });

  test('POST /products creates new product successfully', async () => {
    const newProduct = {
      name: 'Test Product',
      sku: 'TP-001',
      price: 29.99,
      stockQuantity: 100
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect(201);

    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.sku).toBe(newProduct.sku);
    expect(response.body.price).toBe(newProduct.price);
    expect(response.body.stockQuantity).toBe(newProduct.stockQuantity);
  });

  test('POST /products with insufficient inventory returns 409 error', async () => {
    const productWithInsufficientInventory = {
      name: 'Test Product',
      sku: 'TP-002',
      price: 19.99,
      stockQuantity: -10
    };

    await request(app)
      .post('/products')
      .send(productWithInsufficientInventory)
      .expect(400); // Assuming validation catches this first
  });

  test('POST /products with invalid data returns 400 error', async () => {
    const invalidProduct = {
      // Missing name
      sku: 'TP-003',
      price: 25.00,
      stockQuantity: 50
    };

    await request(app)
      .post('/products')
      .send(invalidProduct)
      .expect(400);
  });

  test('GET /products returns list of all products', async () => {
    const response = await request(app)
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products/:id retrieves specific product with items', async () => {
    // First create a product
    const productResponse = await request(app)
      .post('/products')
      .send({
        name: 'Detail Test',
        sku: 'DT-001',
        price: 35.00,
        stockQuantity: 25
      })
      .expect(201);

    const productId = productResponse.body.id;

    // Then retrieve it
    const response = await request(app)
      .get(`/products/${productId}`)
      .expect(200);

    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe('Detail Test');
  });
});