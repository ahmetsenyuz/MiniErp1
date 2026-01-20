const express = require('express');
const router = express.Router();
const salesOrderController = require('../controllers/SalesOrderController');

// Define routes
router.post('/', salesOrderController.createSalesOrder);
router.get('/', salesOrderController.getAllSalesOrders);
router.get('/:id', salesOrderController.getSalesOrderById);
router.post('/:id/items', salesOrderController.addSalesOrderItem);
router.get('/:id/items', salesOrderController.getSalesOrderItems);
router.put('/:id/confirm', salesOrderController.confirmSalesOrder);
router.put('/:id', salesOrderController.updateSalesOrder);
router.delete('/:id', salesOrderController.deleteSalesOrder);

module.exports = router;