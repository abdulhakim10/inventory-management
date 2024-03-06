const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();


// middle wares
app.use(express.json());
app.use(cors());

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
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    // array of object schema
    categories: [{
        name: {
            type: String,
            required: true
        },
        _id: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

// SCHEMA -> MODEL -> QUERY

// initial route
app.get("/", (req, res) => {
    res.send("Route is working Yay!!")
});

app.post("/api/products", (req, res) => {
    res.send("Product added successfully");
});

app.get("/api/products", (req, res) => {
    res.send("All products");
});

app.get("/api/products/:id", (req, res) => {
    res.send("Single product");
});
module.exports = app;