const createError = require("http-errors");
const User = require("../database/models/user");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { confirmRegister } = require("../helpers/sendMail");
const errorResponse = require("../helpers/errorResponse");
const uploadImage = require("../helpers/uploadImage");
module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;

      if ([name, email, password, address, phone].includes("")) {
        throw createError(400, "Todos los campos son obligatorios");
      }
      let user = await User.findOne({
        email,
      });
      if (user) {
        throw createError(400, "El email se encuentra registrado");
      }
      const token = generateTokenRandom();
      user = new User(req.body);
      user.token = token;
      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        user.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
      const userStore = await user.save();
      await confirmRegister({
        name: userStore.name,
        email: userStore.email,
        token: userStore.token,
      });
      return res.status(200).json({
        ok: true,
        status: 200,
        data: userStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "Register");
    }
  },
  login: async () => {
    try {
    } catch (error) {}
  },
  detail: async () => {
    try {
    } catch (error) {}
  },
  allUser: async () => {
    try {
    } catch (error) {}
  },
  checked: async () => {
    try {
    } catch (error) {}
  },
  sendToken: async () => {
    try {
    } catch (error) {}
  },
  verifyToken: async () => {
    try {
    } catch (error) {}
  },
  changePassword: async () => {
    try {
    } catch (error) {}
  },
  update: async () => {
    try {
    } catch (error) {}
  },
  remove: async () => {
    try {
    } catch (error) {}
  },
  removeAll: async (req, res) => {
    try {
      await User.deleteMany();
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Document remove",
      });
    } catch (error) {
      errorResponse(res, error, "Delete Many");
    }
  },
};
