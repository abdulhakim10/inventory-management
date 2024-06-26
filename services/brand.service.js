
const Brand = require('../models/Brand');
exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
}
exports.getBrandService = async () => {
    const brands = await Brand.find({}).populate('products');
    return brands;
}
exports.getOneBrandService = async (id) => {
    const brand = await Brand.findOne({_id: id});
    return brand;
}
exports.updateBrandService = async (id, data) => {
    const brand = await Brand.updateOne({_id: id}, data, {
        runValidators: true,
    });
    return brand;
}