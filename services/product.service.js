const Product = require('../models/Product');

module.exports.getProductService = async() => {
    const products = await Product.find({});
    return products;
}

module.exports.postProductService = async(data) => {
    const product = await Product.create(data);
    return product;
}