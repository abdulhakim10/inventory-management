const Category = require('../models/Category')

exports.crateCategoryService = async (data) => {
    const result = await Category.create(data)
    return result
}
exports.getCategoriesService = async () => {
    const categoryList = await Category.find()
    return categoryList
}
exports.getOneCategoryService = async (id) => {
    const category = await Category.findOne({_id: id})
    return category
}
exports.updateCategoryService = async (id, data) => {
    const result = await Category.updateOne({_id: id}, data, {
        runValidators: true // run validators
    })
    return result
}