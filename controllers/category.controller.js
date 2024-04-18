const { getCategoriesService, getOneCategoryService, crateCategoryService, updateCategoryService } = require("../services/category.service")

exports.createCategoryController = async (req, res, next) => {
    try {
        const categories = await crateCategoryService(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Category data created successfully',
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't create category data"
        })
    }
}

exports.getCategoriesController = async (req, res, next) => {
    try {
        const categories = await getCategoriesService()
        res.status(200).json({
            status: 'success',
            message: 'Categories data fetched successfully',
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't fetched categories"
        })
    }
}

exports.getOneCategoryController = async (req, res, next) => {
    try {
        const {id} = req.params
        const category = await getOneCategoryService(id)

        if(!category){
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't fetched the category by this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Category data fetched successfully',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't fetched the category"
        })
    }
}
exports.updateCategoryController = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await updateCategoryService(id, req.body)

        if(!result.nModified){
            return res.status(400).json({
                status: 'fail',
                error: "Couldn't create the category by this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Category data created successfully',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't create the category"
        })
    }
}