# Database Schema Design

This document outlines the database schema for the Mini-ERP system, defining the core entities and their relationships.

## Entity Relationship Diagram

```
[Product] 1 ----< [ProductStock]
[Supplier] 1 ----< [Purchase]
[Purchase] 1 ----< [PurchaseItem]
[Product] 1 ----< [PurchaseItem]
[SalesOrder] 1 ----< [SalesOrderItem]
[Product] 1 ----< [SalesOrderItem]
```

## Tables

### Product Table
Fields:
- id (Primary Key)
- name
- sku (Unique)
- selling_price
- critical_stock_level

### Supplier Table
Fields:
- id (Primary Key)
- company_name
- contact_person
- phone
- email

### Purchase Table
Fields:
- id (Primary Key)
- supplier_id (Foreign Key to Supplier)
- purchase_date
- total_amount

### SalesOrder Table
Fields:
- id (Primary Key)
- customer_name
- order_date
- total_amount

### ProductStock Table
Fields:
- id (Primary Key)
- product_id (Foreign Key to Product)
- quantity_on_hand (Non-negative)
- cost_price

### PurchaseItem Table
Fields:
- id (Primary Key)
- purchase_id (Foreign Key to Purchase)
- product_id (Foreign Key to Product)
- quantity
- unit_price

### SalesOrderItem Table
Fields:
- id (Primary Key)
- sales_order_id (Foreign Key to SalesOrder)
- product_id (Foreign Key to Product)
- quantity
- unit_price
```
