const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try{
        // projection
       const products = await Product.find(); 
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
    const result = await Product.create(req.body)
    result.logger();

    res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: result
    });      
    }
    catch(error){
        next(error);
    }
}