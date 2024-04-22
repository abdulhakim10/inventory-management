const e = require('cors');
const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

// schema design
const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        unique: [true, "Name must be unique."],
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large."]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email."],
        trim: true,
        unique: [true, "Email must be unique."],
        lowercase: true,
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            // type: ObjectId,
            // required: true,
            // ref: "Brand",
        }
    },
    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number."],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid contact number."
        }
    }],
    emergencyContactNumber: [{
        type: String,
        required: [true, "Please provide a emergency contact number."],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid emergency contact number."
        }
    }],
    tradeLicenseNumber: {
        type: String,
        required: [true, "Please provide a trade license number."]
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide a present address."]
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide a permanent address."]
    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur"],
            message: "{VALUE} is not a valid store."
        }
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid image URL."]
    }],
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
}, {
    timestamps: true
});


// SCHEMA -> MODEL -> QUERY

// creating model
const Supplier = mongoose.model("Supplier", supplierSchema);


module.exports = Supplier;