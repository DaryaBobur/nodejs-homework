const {User} = require('../../models/user');

const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir)

const updateAvatar = async(req, res) => {
    const {path: tmpUploadAvatar, originalname} = req.file;
    const {_id } = req.user;
    const avatarName = `${_id}_${originalname}`;

    try {
        const resultUploadAvatar = path.join(avatarsDir, avatarName);

        await fs.rename(tmpUploadAvatar, resultUploadAvatar);

        const resizeImage = await Jimp.read(resultUploadAvatar);
        resizeImage.resize(250, 250).write(resultUploadAvatar);

        const avatarURL = path.join("avatars", avatarName);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL
        });
    } catch (error) {
        await fs.unlink(tmpUploadAvatar);
        throw error;
    }
}

module.exports = updateAvatar;