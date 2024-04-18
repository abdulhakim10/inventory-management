const { createStoreService, getStoreService, getOneStoreService, updateStoreService } = require("../services/store.service");

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);
        res.status(201).json({
            status: "success",
            message: "store created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't create store"
        })
    }
}
exports.getStores = async (req, res, next) => {
    try {
        const result = await getStoreService();
        res.status(200).json({
            status: "success",
            message: "store fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't fetch store"
        })
    }
}
exports.getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getOneStoreService(id);
        if (!result) {
            return res.status(404).json({
                status: "fail",
                message: "store not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "store fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't fetch store"
        })
    }
}
exports.updateStore = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreService(id, req.body);
        if (!result.nModified || result.nModified === 0) {
            return res.status(404).json({
                status: "fail",
                message: "store not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "store updated successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't update store"
        })
    }
}