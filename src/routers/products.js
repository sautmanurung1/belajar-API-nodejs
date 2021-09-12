const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products')
// Create => POST
router.post('/products', productsController.createProducts);

// READ => GET
router.get('/products', productsController.getALLProducts);


module.exports = router;