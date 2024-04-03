const Product = require('../models/Product');

module.exports.getProductService = async() => {
    const products = await Product.find({});
    return products;
}

module.exports.postProductService = async(data) => {
    const product = await Product.create(data);
    return product;
}

module.exports.updateProductService = async(productId, data) => {
    // const product = await Product.updateOne({_id: productId}, {$set: data}, {
    //     runValidators: true,
    // });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}

module.exports.bulkUpdateService = async(data) => {
    // console.log(ids)
    const result = await Product.updateMany({_id: data.ids}, data.data, {
        runValidators: true,
    });
    return result;

}