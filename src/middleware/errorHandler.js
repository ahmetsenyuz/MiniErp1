const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error response
  const errorResponse = {
    error: 'Internal server error',
    message: err.message || 'Something went wrong'
  };

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.details || err.message
    });
  }

  // Handle business rule violations
  if (err.code === 'BUSINESS_RULE_VIOLATION') {
    return res.status(409).json({
      error: 'Business rule violation',
      message: err.message
    });
  }

  // Handle not found errors
  if (err.code === 'NOT_FOUND') {
    return res.status(404).json({
      error: 'Resource not found',
      message: err.message
    });
  }

  // Handle duplicate key errors (e.g., SKU already exists)
  if (err.code === 'DUPLICATE_KEY') {
    return res.status(409).json({
      error: 'Duplicate entry',
      message: err.message
    });
  }

  // Handle insufficient inventory errors
  if (err.code === 'INSUFFICIENT_INVENTORY') {
    return res.status(409).json({
      error: 'Insufficient inventory',
      message: err.message
    });
  }

  // Default error response
  res.status(500).json(errorResponse);
};

module.exports = errorHandler;