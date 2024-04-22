const { createSupplierService, getSuppliersService, getOneSupplierService, updateSupplierService } = require('../services/supplier.service');

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Supplier created successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't create the supplier",
            message: error.message
        })
    }
}

exports.getSuppliers = async (req, res, next) => {
    try {
        const result = await getSuppliersService()
        res.status(201).json({
            status: 'success',
            message: 'Suppliers fetched successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the suppliers"
        })
    }
}

exports.getOneSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await getOneSupplierService(id)
        if(!supplier){
            res.status(400).json({
                status: 'fail',
                error: "Couldn't get the supplier"
            })
        
        }
        res.status(201).json({
            status: 'success',
            message: 'Suppliers fetched successfully',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't get the supplier"
        })
    }
}

exports.updateSupplier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateSupplierService(id, req.body)
        if(!result. modifiedCount || result.modifiedCount === 0){
            res.status(400).json({
                status: 'fail',
                error: "Couldn't update the supplier by this id"
            })
        
        }
        res.status(201).json({
            status: 'success',
            message: 'Successfully updated the supplier',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: "Couldn't update the supplier"
        })
    }
}