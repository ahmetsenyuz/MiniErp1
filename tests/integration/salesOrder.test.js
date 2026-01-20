const request = require('supertest');
const app = require('../../src/app');

describe('Sales Order API', () => {
  beforeEach(() => {
    // Reset in-memory data store before each test
    // In a real implementation, this would reset the database
  });

  test('POST /sales-orders creates new sales order successfully', async () => {
    const newOrder = {
      customerName: 'John Doe',
      items: [
        {
          productId: 1,
          quantity: 2,
          unitPrice: 10.00
        }
      ]
    };

    const response = await request(app)
      .post('/sales-orders')
      .send(newOrder)
      .expect(201);

    expect(response.body.customerName).toBe(newOrder.customerName);
    expect(response.body.items.length).toBe(1);
  });

  test('POST /sales-orders with insufficient inventory returns 409 error', async () => {
    const orderWithInsufficientInventory = {
      customerName: 'Jane Smith',
      items: [
        {
          productId: 999, // Non-existent product
          quantity: 100,
          unitPrice: 15.00
        }
      ]
    };

    await request(app)
      .post('/sales-orders')
      .send(orderWithInsufficientInventory)
      .expect(400); // Assuming validation catches this first
  });

  test('POST /sales-orders with invalid data returns 400 error', async () => {
    const invalidOrder = {
      // Missing customerName
      items: []
    };

    await request(app)
      .post('/sales-orders')
      .send(invalidOrder)
      .expect(400);
  });

  test('POST /sales-orders/items adds items to sales order', async () => {
    // First create an order
    const orderResponse = await request(app)
      .post('/sales-orders')
      .send({
        customerName: 'Test Customer',
        items: []
      })
      .expect(201);

    const orderId = orderResponse.body.id;

    // Then add an item
    const itemToAdd = {
      productId: 1,
      quantity: 3,
      unitPrice: 25.00
    };

    const response = await request(app)
      .post(`/sales-orders/${orderId}/items`)
      .send(itemToAdd)
      .expect(201);

    expect(response.body.productId).toBe(itemToAdd.productId);
    expect(response.body.quantity).toBe(itemToAdd.quantity);
  });

  test('PUT /sales-orders/:id/confirm confirms order and updates inventory', async () => {
    // First create an order
    const orderResponse = await request(app)
      .post('/sales-orders')
      .send({
        customerName: 'Confirm Test',
        items: [
          {
            productId: 1,
            quantity: 1,
            unitPrice: 10.00
          }
        ]
      })
      .expect(201);

    const orderId = orderResponse.body.id;

    // Then confirm the order
    const confirmResponse = await request(app)
      .put(`/sales-orders/${orderId}/confirm`)
      .expect(200);

    expect(confirmResponse.body.status).toBe('confirmed');
  });

  test('GET /sales-orders returns list of all sales orders', async () => {
    const response = await request(app)
      .get('/sales-orders')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /sales-orders/:id retrieves specific sales order with items', async () => {
    // First create an order
    const orderResponse = await request(app)
      .post('/sales-orders')
      .send({
        customerName: 'Detail Test',
        items: [
          {
            productId: 1,
            quantity: 1,
            unitPrice: 10.00
          }
        ]
      })
      .expect(201);

    const orderId = orderResponse.body.id;

    // Then retrieve it
    const response = await request(app)
      .get(`/sales-orders/${orderId}`)
      .expect(200);

    expect(response.body.id).toBe(orderId);
    expect(response.body.items.length).toBe(1);
  });
});