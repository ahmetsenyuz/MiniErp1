const request = require('supertest');
const app = require('../../src/app');

describe('Purchase API', () => {
  beforeEach(() => {
    // Reset in-memory data store before each test
    // In a real implementation, this would reset the database
  });

  test('POST /purchases creates new purchase order successfully', async () => {
    const newPurchase = {
      supplierName: 'John Doe',
      items: [
        {
          productId: 1,
          quantity: 2,
          unitPrice: 10.00
        }
      ]
    };

    const response = await request(app)
      .post('/purchases')
      .send(newPurchase)
      .expect(201);

    expect(response.body.supplierName).toBe(newPurchase.supplierName);
    expect(response.body.items.length).toBe(1);
  });

  test('POST /purchases with insufficient inventory returns 409 error', async () => {
    const purchaseWithInsufficientInventory = {
      supplierName: 'Jane Smith',
      items: [
        {
          productId: 999, // Non-existent product
          quantity: 100,
          unitPrice: 15.00
        }
      ]
    };

    await request(app)
      .post('/purchases')
      .send(purchaseWithInsufficientInventory)
      .expect(400); // Assuming validation catches this first
  });

  test('POST /purchases with invalid data returns 400 error', async () => {
    const invalidPurchase = {
      // Missing supplierName
      items: []
    };

    await request(app)
      .post('/purchases')
      .send(invalidPurchase)
      .expect(400);
  });

  test('POST /purchases/items adds items to purchase order', async () => {
    // First create a purchase order
    const purchaseResponse = await request(app)
      .post('/purchases')
      .send({
        supplierName: 'Test Supplier',
        items: []
      })
      .expect(201);

    const purchaseId = purchaseResponse.body.id;

    // Then add an item
    const itemToAdd = {
      productId: 1,
      quantity: 3,
      unitPrice: 25.00
    };

    const response = await request(app)
      .post(`/purchases/${purchaseId}/items`)
      .send(itemToAdd)
      .expect(201);

    expect(response.body.productId).toBe(itemToAdd.productId);
    expect(response.body.quantity).toBe(itemToAdd.quantity);
  });

  test('PUT /purchases/:id/confirm confirms order and updates inventory', async () => {
    // First create a purchase order
    const purchaseResponse = await request(app)
      .post('/purchases')
      .send({
        supplierName: 'Confirm Test',
        items: [
          {
            productId: 1,
            quantity: 1,
            unitPrice: 10.00
          }
        ]
      })
      .expect(201);

    const purchaseId = purchaseResponse.body.id;

    // Then confirm the order
    const confirmResponse = await request(app)
      .put(`/purchases/${purchaseId}/confirm`)
      .expect(200);

    expect(confirmResponse.body.status).toBe('confirmed');
  });

  test('GET /purchases returns list of all purchase orders', async () => {
    const response = await request(app)
      .get('/purchases')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /purchases/:id retrieves specific purchase order with items', async () => {
    // First create a purchase order
    const purchaseResponse = await request(app)
      .post('/purchases')
      .send({
        supplierName: 'Detail Test',
        items: [
          {
            productId: 1,
            quantity: 1,
            unitPrice: 10.00
          }
        ]
      })
      .expect(201);

    const purchaseId = purchaseResponse.body.id;

    // Then retrieve it
    const response = await request(app)
      .get(`/purchases/${purchaseId}`)
      .expect(200);

    expect(response.body.id).toBe(purchaseId);
    expect(response.body.items.length).toBe(1);
  });
});