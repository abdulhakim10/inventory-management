const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email.'],
        required: [true, "Email is required."],
        trim: true,
        lowercase: true,
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not strong enough.",
        },
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password."],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords don't match.",
        },
    },

    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },

    firstName: {
        type: String,
        required: [true, "First name is required."],
        trim: true,
        minLength: [3, "First name must be at least 3 characters."],
        maxLength: [100, "First name is too long."],
    },

    lastName: {
        type: String,
        required: [true, "Last name is required."],
        trim: true,
        minLength: [3, "Last name must be at least 3 characters."],
        maxLength: [100, "Last name is too long."],
    },
    
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, 'Please provide a valid contact number.'],
        // required: [true, "Contact number is required."],
    },

    shippingAddress: String,

    imageURL: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid url.'],
    },

    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active",
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    timestamps: true
}
);

// Middleware for Hashing the password
userSchema.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});

// Middleware for comparing password
userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;