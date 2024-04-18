const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/category.controller');

router.route('/')
    .get(categoriesController.getCategoriesController)
    .post(categoriesController.createCategoryController)

router.route('/:id')
    .get(categoriesController.getOneCategoryController)
    .patch(categoriesController.updateCategoryController)
module.exports = router;