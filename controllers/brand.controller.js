const { createBrandService, getBrandService, getOneBrandService } = require("../services/brand.service")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Brand created successfully',
            // data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't create the brand"
        })
    }
}
exports.getBrands = async (req, res, next) => {
    try {
        const result = await getBrandService()
        res.status(201).json({
            status: 'success',
            message: 'Brands fetched successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the brand"
        })
    }
}
exports.getOneBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getOneBrandService(id)
        if(!brand){
            res.status(400).json({
                status: 'fail',
                error: "Couldn't get the brand"
            })
        
        }
        res.status(201).json({
            status: 'success',
            message: 'Brands fetched successfully',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the brand"
        })
    }
}
exports.updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateBrandService(id, req.body)
        if(!result.nModified){
            res.status(400).json({
                status: 'fail',
                error: "Couldn't update the brand by this id"
            })
        
        }
        res.status(201).json({
            status: 'success',
            message: 'Successfully updated the brand',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't update the brand"
        })
    }
}