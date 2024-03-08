const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();


// middle wares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route')

// initial route
app.get("/", (req, res) => {
    res.send("Route is working Yay!!")
});

// app.delete("/api/v1/delete/:id", async(req, res) => {
//    try{
//     const id = req.params.id;
//     const query = {_id: id};
//     const result = await Product.deleteOne(query);
//     res.status(200).json({
//         success: true,
//         message: "Product deleted successfully."
//     });
//    }
//    catch(error){
//     res.status(400).json({
//         success: false,
//         message: error.message
//     });
//    }
// });

app.use("/api/v1/products", productRoute);

module.exports = app;