const multer = require('multer');
const path = require('path');

// If any paid server use like AWS etc then configure will be change other things will remain same.
// multer configuration set
const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); 
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Only PNG, JPG and JPEG formats are allowed!"))
        }
    },
    limits: {
        fileSize: 5000000 // 5MB
    }

})

module.exports = uploader;