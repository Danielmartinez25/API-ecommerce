const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});
module.exports = {
  uploadImage: async (filePath) => {
    const image = await cloudinary.uploader.upload(filePath, {
      folder: "user-eCommerce",
    });
    return image;
  },
  deleteImage : async(publicId) =>{
    const removeImage = await cloudinary.uploader.destroy(publicId)
    return removeImage
  }

};
