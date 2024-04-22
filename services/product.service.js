const Product = require('../models/Product');
const Brand = require('../models/Brand');

module.exports.getProductService = async (filters, queries) => {
    const products = await Product
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = await Product.countDocuments(filters);
    const page = Math.ceil(total/queries.limit);
    return {total, page, products};
}

module.exports.postProductService = async (data) => {
    const product = await Product.create(data);
    const {_id: productId, brand} = product;

    // update Brand
    const res = await Brand.updateOne(
        {_id: brand.id},
        {$push: {products: productId}}              
    )
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
        products.push(Product.updateOne({ _id: product.id }, product.data, { runValidators: true }));
    });

    const result = await Promise.all(products);
    return result;

}