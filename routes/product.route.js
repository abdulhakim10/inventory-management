const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

router.route('/')
.get(productController.getProducts)
.post(productController.postProduct)


module.exports = router;