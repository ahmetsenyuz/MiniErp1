const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const purchaseRoutes = require('./routes/purchaseRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

app.use('/purchases', purchaseRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;