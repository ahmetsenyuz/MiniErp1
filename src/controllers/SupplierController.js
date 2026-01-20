const supplierService = require('./../services/SupplierService');
const { validateSupplier } = require('./../middleware/validation');

class SupplierController {
  // POST /suppliers
  async createSupplier(req, res) {
    try {
      const supplier = await supplierService.createSupplier(req.body);
      res.status(201).json(supplier);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /suppliers
  async getAllSuppliers(req, res) {
    try {
      const suppliers = await supplierService.getAllSuppliers();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /suppliers/:id
  async getSupplierById(req, res) {
    try {
      const supplier = await supplierService.getSupplierById(req.params.id);
      res.json(supplier);
    } catch (error) {
      if (error.message === 'Supplier not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /suppliers/:id
  async updateSupplier(req, res) {
    try {
      const supplier = await supplierService.updateSupplier(req.params.id, req.body);
      res.json(supplier);
    } catch (error) {
      if (error.message === 'Supplier not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /suppliers/:id
  async deleteSupplier(req, res) {
    try {
      const supplier = await supplierService.deleteSupplier(req.params.id);
      res.json({ message: 'Supplier deleted successfully', supplier });
    } catch (error) {
      if (error.message === 'Supplier not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new SupplierController();