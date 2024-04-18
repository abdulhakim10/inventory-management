const Store = require('../models/Store');

exports.createStoreService = async (data) => {
    const result = await Store.create(data, {
        runValidators: true,
    });
    return result;
}
exports.getStoreService = async () => {
    const stores = await Store.find({})
    return stores;
}
exports.getOneStoreService = async (id) => {
    const store = await Store.findOne({_id: id})
    return store;
}
exports.updateStoreService = async (id, data) => {
    const store = await Store.updateOne({_id: id}, data, {
        runValidators: true
    })
    return store;
}