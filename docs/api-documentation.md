# API Documentation

This document provides comprehensive documentation for all API endpoints in the Mini-ERP system.

## Base URL

All API endpoints are accessible under the base URL:
```
http://localhost:3000/api/v1
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include the following header in your requests:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Products

#### GET /products
Retrieve all products

#### GET /products/:id
Retrieve a specific product by ID

#### POST /products
Create a new product

#### PUT /products/:id
Update an existing product

#### DELETE /products/:id
Delete a product

### Sales Orders

#### GET /sales-orders
Retrieve all sales orders

#### GET /sales-orders/:id
Retrieve a specific sales order by ID

#### POST /sales-orders
Create a new sales order

#### PUT /sales-orders/:id
Update an existing sales order

#### DELETE /sales-orders/:id
Delete a sales order

### Purchases

#### GET /purchases
Retrieve all purchases

#### GET /purchases/:id
Retrieve a specific purchase by ID

#### POST /purchases
Create a new purchase

#### PUT /purchases/:id
Update an existing purchase

#### DELETE /purchases/:id
Delete a purchase

### Suppliers

#### GET /suppliers
Retrieve all suppliers

#### GET /suppliers/:id
Retrieve a specific supplier by ID

#### POST /suppliers
Create a new supplier

#### PUT /suppliers/:id
Update an existing supplier

#### DELETE /suppliers/:id
Delete a supplier

## Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse. The default limit is 100 requests per hour per IP address.