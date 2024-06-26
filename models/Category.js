const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema  = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    description: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid image URL"]
    }
},
{
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;