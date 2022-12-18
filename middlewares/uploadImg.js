const multer = require("multer");
const path = require("path");

const avatarPath = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadImg = multer({
    storage: multerConfig
});

module.exports = uploadImg;