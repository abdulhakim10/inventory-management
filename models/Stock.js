const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// schema design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: [true, "Please provide a name for this Stock."],
        unique: [true, "Name must be unique."],
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."]
    },
    description: {
        type: String,
        required: true,
    },
    // price: {
    //     type: Number,
    //     required: true,
    //     min: [0, "Price can't be negative."]
    // },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    imageURLs: [{
        type: String,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid = false;
                    }
                });
                return isValid;
            },
            message: "Please provide valid image URLs."
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative."]
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            required: [true, "Please provide a store name"],
            lowercase: true,
            trim: true,
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Supplier"
        }
    }

}, {
    timestamps: true
});

// mongoose middleware for saving data: pre / post.
stockSchema.pre("save", function (next) {
    console.log("Before saving data");
    if (this.quantity == 0) {
        this.status = "out-of-stock";
    }

    next()
});

// stockSchema.post("post", function(doc, next) {
//     console.log("After saving data.")
// })

// instance
stockSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

// SCHEMA -> MODEL -> QUERY

// creating model
const Stock = mongoose.model("Stock", stockSchema);


module.exports = Stock;