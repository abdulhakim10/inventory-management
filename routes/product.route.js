const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// const multer = require('multer');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

// const uploader = multer({dest: "images/"});

router.post("/file-upload", uploader.single("productImage"), productController.fileUpload)

router.route('/bulk-update')
.patch(productController.bulkUpdateProduct)

router.route('/')
.get(productController.getProducts)
.post(verifyToken, authorization("admin"), productController.postProduct)

// console.log(productController.updateProduct)



router.route('/:id')
.patch(productController.updateProduct)



module.exports = router;