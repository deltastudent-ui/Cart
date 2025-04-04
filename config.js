require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { config } = require("process");


//setupt cloudinary 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// setup multer 
const multer = require("multer");
const { format } = require("path/posix");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{

        folder:"upload",
        allowed_formats: ["jpg", "jpeg", "png", "avif"]
    }
})
const upload = multer({storage});
module.exports = {cloudinary,upload};
