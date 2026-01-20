const productService = require('../services/ProductService');
const { validateProduct, validateUniqueSKU } = require('../middleware/validation');

class ProductController {
  // POST /products
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // GET /products
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /products/:id
  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT /products/:id
  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /products/:id
  async deleteProduct(req, res) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      res.json({ message: 'Product deleted successfully', product });
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ProductController();