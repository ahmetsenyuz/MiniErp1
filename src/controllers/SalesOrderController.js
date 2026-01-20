const salesOrderService = require('../services/SalesOrderService');
const { validateSalesOrder, validateUniqueSKU } = require('../middleware/validation');

class SalesOrderController {
  // POST /sales-orders
  async createSalesOrder(req, res) {
    try {
      const salesOrder = await salesOrderService.createSalesOrder(req.body);
      res.status(201).json(salesOrder);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /sales-orders
  async getAllSalesOrders(req, res) {
    try {
      const salesOrders = await salesOrderService.getAllSalesOrders();
      res.json(salesOrders);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /sales-orders/:id
  async getSalesOrderById(req, res) {
    try {
      const salesOrder = await salesOrderService.getSalesOrderById(req.params.id);
      res.json(salesOrder);
    } catch (error) {
      if (error.message === 'Sales order not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST /sales-orders/:id/items
  async addSalesOrderItem(req, res) {
    try {
      const item = await salesOrderService.addSalesOrderItem(req.params.id, req.body);
      res.status(201).json(item);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /sales-orders/:id/items
  async getSalesOrderItems(req, res) {
    try {
      const items = await salesOrderService.getSalesOrderItemsBySalesOrderId(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /sales-orders/:id/confirm
  async confirmSalesOrder(req, res) {
    try {
      const salesOrder = await salesOrderService.confirmSalesOrder(req.params.id);
      res.json(salesOrder);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /sales-orders/:id
  async updateSalesOrder(req, res) {
    try {
      const salesOrder = await salesOrderService.updateSalesOrder(req.params.id, req.body);
      res.json(salesOrder);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /sales-orders/:id
  async deleteSalesOrder(req, res) {
    try {
      const salesOrder = await salesOrderService.deleteSalesOrder(req.params.id);
      res.json({ message: 'Sales order deleted successfully', salesOrder });
    } catch (error) {
      if (error.message === 'Sales order not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new SalesOrderController();