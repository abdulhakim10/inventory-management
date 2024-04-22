const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock.controller');

// router.route('/bulk-update')

router.route('/')
    .get(stockController.getStocks)
    .post(stockController.postStock)

router.route('/:id')
    .get()
    .patch()

module.exports = router;