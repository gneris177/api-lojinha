const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");

module.exports = async (file) => {
  if (file) {
    try {
      const response = await cloudinary.uploader.upload(file.path);

      //delete upload
      const resultHandler = (err) => {
        if (err) console.log("unlink failed", err);
      };
      fs.unlink(file.path, resultHandler);

      return response;
    } catch (err) {
      console.log(err);
    }
  }
};
