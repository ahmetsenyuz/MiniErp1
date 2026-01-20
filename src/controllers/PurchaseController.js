const purchaseService = require('../services/PurchaseService');
const { validatePurchase, validateUniqueSKU } = require('../middleware/validation');

class PurchaseController {
  // POST /purchases
  async createPurchase(req, res) {
    try {
      const purchase = await purchaseService.createPurchase(req.body);
      res.status(201).json(purchase);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /purchases
  async getAllPurchases(req, res) {
    try {
      const purchases = await purchaseService.getAllPurchases();
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /purchases/:id
  async getPurchaseById(req, res) {
    try {
      const purchase = await purchaseService.getPurchaseById(req.params.id);
      res.json(purchase);
    } catch (error) {
      if (error.message === 'Purchase not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST /purchases/:id/items
  async addPurchaseItem(req, res) {
    try {
      const item = await purchaseService.addPurchaseItem(req.params.id, req.body);
      res.status(201).json(item);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /purchases/:id/items
  async getPurchaseItems(req, res) {
    try {
      const items = await purchaseService.getPurchaseItemsByPurchaseId(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /purchases/:id/confirm
  async confirmPurchase(req, res) {
    try {
      const purchase = await purchaseService.confirmPurchase(req.params.id);
      res.json(purchase);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // PUT /purchases/:id
  async updatePurchase(req, res) {
    try {
      const purchase = await purchaseService.updatePurchase(req.params.id, req.body);
      res.json(purchase);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /purchases/:id
  async deletePurchase(req, res) {
    try {
      const purchase = await purchaseService.deletePurchase(req.params.id);
      res.json({ message: 'Purchase deleted successfully', purchase });
    } catch (error) {
      if (error.message === 'Purchase not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new PurchaseController();