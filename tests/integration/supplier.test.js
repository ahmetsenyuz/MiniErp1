const request = require('supertest');
const app = require('../../src/app');

describe('Supplier API', () => {
  beforeEach(() => {
    // Reset in-memory data store before each test
    // In a real implementation, this would reset the database
  });

  test('POST /suppliers creates new supplier successfully', async () => {
    const newSupplier = {
      name: 'Test Supplier',
      contactPerson: 'John Doe',
      email: 'john@test.com',
      phone: '123-456-7890'
    };

    const response = await request(app)
      .post('/suppliers')
      .send(newSupplier)
      .expect(201);

    expect(response.body.name).toBe(newSupplier.name);
    expect(response.body.contactPerson).toBe(newSupplier.contactPerson);
    expect(response.body.email).toBe(newSupplier.email);
    expect(response.body.phone).toBe(newSupplier.phone);
  });

  test('POST /suppliers with invalid data returns 400 error', async () => {
    const invalidSupplier = {
      // Missing name
      contactPerson: 'Jane Smith',
      email: 'jane@test.com',
      phone: '098-765-4321'
    };

    await request(app)
      .post('/suppliers')
      .send(invalidSupplier)
      .expect(400);
  });

  test('GET /suppliers returns list of all suppliers', async () => {
    const response = await request(app)
      .get('/suppliers')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /suppliers/:id retrieves specific supplier', async () => {
    // First create a supplier
    const supplierResponse = await request(app)
      .post('/suppliers')
      .send({
        name: 'Detail Test',
        contactPerson: 'John Doe',
        email: 'john@test.com',
        phone: '123-456-7890'
      })
      .expect(201);

    const supplierId = supplierResponse.body.id;

    // Then retrieve it
    const response = await request(app)
      .get(`/suppliers/${supplierId}`)
      .expect(200);

    expect(response.body.id).toBe(supplierId);
    expect(response.body.name).toBe('Detail Test');
  });

  test('PUT /suppliers/:id updates supplier', async () => {
    // First create a supplier
    const supplierResponse = await request(app)
      .post('/suppliers')
      .send({
        name: 'Original Supplier',
        contactPerson: 'John Doe',
        email: 'john@test.com',
        phone: '123-456-7890'
      })
      .expect(201);

    const supplierId = supplierResponse.body.id;

    // Then update it
    const updateData = {
      name: 'Updated Supplier',
      contactPerson: 'Jane Smith',
      email: 'jane@test.com',
      phone: '098-765-4321'
    };

    const response = await request(app)
      .put(`/suppliers/${supplierId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toBe('Updated Supplier');
    expect(response.body.contactPerson).toBe('Jane Smith');
  });

  test('DELETE /suppliers/:id deletes supplier', async () => {
    // First create a supplier
    const supplierResponse = await request(app)
      .post('/suppliers')
      .send({
        name: 'Test Supplier',
        contactPerson: 'John Doe',
        email: 'john@test.com',
        phone: '123-456-7890'
      })
      .expect(201);

    const supplierId = supplierResponse.body.id;

    // Then delete it
    const response = await request(app)
      .delete(`/suppliers/${supplierId}`)
      .expect(200);

    expect(response.body).toBeUndefined();
  });
});