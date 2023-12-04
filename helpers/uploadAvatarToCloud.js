const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_KEY } = require("../tempConf");

cloudinary.config({
  secure: true,
  ...CLOUDINARY_KEY,
});

const uploadAvatarToCloud = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    folder: "avatars",
    overwrite: true,
  };

  const { url } = await cloudinary.uploader.upload(imagePath, options);

  return url;
};

module.exports = uploadAvatarToCloud;
