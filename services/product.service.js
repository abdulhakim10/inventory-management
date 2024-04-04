const Product = require('../models/Product');

module.exports.getProductService = async (filters, queries) => {
    const products = await Product.find(filters).sort(queries.sortBy).select(queries.fields);
    return products;
}

module.exports.postProductService = async (data) => {
    const product = await Product.create(data);
    return product;
}

module.exports.updateProductService = async (productId, data) => {
    // const product = await Product.updateOne({_id: productId}, {$set: data}, {
    //     runValidators: true,
    // });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}

module.exports.bulkUpdateService = async (data) => {
    // console.log(ids)
    // const result = await Product.updateMany({_id: data.ids}, data.data, {
    //     runValidators: true,
    // });

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({_id: product.id},  product.data, {runValidators: true}));
    });
    
    const result = await Promise.all(products);
    return result;

}