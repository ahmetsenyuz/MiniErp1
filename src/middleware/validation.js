const Product = require('../models/Product');

const validateProduct = (req, res, next) => {
  const errors = Product.validate(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }
  
  next();
};

const validateUniqueSKU = (req, res, next) => {
  // This middleware would typically check against database
  // For now, we'll assume it's handled by the service layer
  next();
};

module.exports = {
  validateProduct,
  validateUniqueSKU
};