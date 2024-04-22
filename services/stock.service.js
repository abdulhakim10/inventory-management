const Brand = require('../models/Brand');
const Stock = require('../models/Stock');

module.exports.getStocksService = async (filters, queries) => {
    const stocks = await Stock
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = await Stock.countDocuments(filters);
    const page = Math.ceil(total/queries.limit);
    return {total, page, stocks};
}

module.exports.postStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;
}

// module.exports.updateStockService = async (productId, data) => {
//     // const product = await Stock.updateOne({_id: productId}, {$set: data}, {
//     //     runValidators: true,
//     // });

//     const stock = await Stock.findById(stockId);
//     const result = await stock.set(data).save();
//     return result;
// }

// module.exports.bulkUpdateService = async (data) => {
//     // console.log(ids)
//     // const result = await Stock.updateMany({_id: data.ids}, data.data, {
//     //     runValidators: true,
//     // });

//     const products = [];
//     data.ids.forEach(product => {
//         products.push(Stock.updateOne({ _id: product.id }, product.data, { runValidators: true }));
//     });

//     const result = await Promise.all(products);
//     return result;

// }