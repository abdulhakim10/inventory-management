const mongoose = require('mongoose');

// schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        unique: [true, "Name must be unique."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative."],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false;
                }
            }
        },
        message: "Quantity must be an integer."
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    // reference to supplier model/schema | Example
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // // array of object schema
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true
});

// mongoose middleware for saving data: pre / post.
productSchema.pre("save", function(next){
    console.log("Before saving data");
    if(this.quantity == 0){
        this.status = "out-of-stock";
    }

    next()
});

// productSchema.post("post", function(doc, next) {
//     console.log("After saving data.")
// })

// instance
productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`);
}

// SCHEMA -> MODEL -> QUERY

// creating model
const Product = mongoose.model("Product", productSchema);


module.exports = Product;