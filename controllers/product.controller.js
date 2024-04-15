const Product = require("../models/Product");
const { getProductService, postProductService, updateProductService, bulkUpdateService } = require("../services/product.service");


exports.getProducts = async (req, res) => {
    try{
        // projection
        let filters ={...req.query};
        
        // sort, page, limit, => exclude
        const excludeFields = ["sort", "page", "limit"];
        excludeFields.forEach(field => delete filters[field]);

        // gt, gte, lt, lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`);
        filters = JSON.parse(filtersString);
        // console.log(filters)
        // console.log(filtersString)

        const queries = {};

        if(req.query.sort){
            // price,quantity => price quantity
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if(req.query.page){
            const {page=1, limit=3} = req.query;

            const skip = (page -1)*parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

       const products = await getProductService(filters, queries); 
       res.status(200).json({
        success: true,
        data: products
       });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.postProduct = async(req, res, next) => {
    try{
    // creating instance of product model
    // const product = new Product(req.body);
    // if (product.quantity == 0) {
    //     product.status = "out-of-stock";
    // }
    // product save on database
    // const result = await product.save();

    // product save on database using create method
    const result = await postProductService(req.body);
    result.logger();

    res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: result
    });      
    }
    catch(error) {
        res.status(400).json({
            success: false,
            message:"couldn't create the product",
            error: error.message,
        });
    };
};

exports.updateProduct = async(req, res, next) => {
    try{
        const {id} = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).json({
            success: false,
            message:"update success",
            data: result
        })
    }
    catch(error) {
        res.status(400).json({
            success: false,
            message:"couldn't update the product",
            error: error.message,
        });
    }
};

exports.bulkUpdateProduct = async(req, res, next) =>{
    try{
        const result = await bulkUpdateService(req.body);
        res.status(200).json({
            success: true,
            message:"update success",
            data: result
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            message:"couldn't update the product",
            error: error.message,
        }); 
    }
}