const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/PurchaseController');

// Define routes
router.post('/', purchaseController.createPurchase);
router.get('/', purchaseController.getAllPurchases);
router.get('/:id', purchaseController.getPurchaseById);
router.post('/:id/items', purchaseController.addPurchaseItem);
router.get('/:id/items', purchaseController.getPurchaseItems);
router.put('/:id/confirm', purchaseController.confirmPurchase);
router.put('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;