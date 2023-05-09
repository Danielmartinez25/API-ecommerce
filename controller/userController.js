const createError = require("http-errors");
const User = require("../database/models/user");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { confirmRegister } = require("../helpers/sendMail");
const errorResponse = require("../helpers/errorResponse");
const { uploadImage, deleteImage } = require("../helpers/uploadImage");
const fs = require("fs-extra");
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
      const token = generateTokenRandom(req, res);
      user = new User(req.body);
      user.token = token;
      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        user.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        await fs.unlink(req.files.image.tempFilePath);
      }
      const userStore = await user.save(req, res);
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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if ([email, password].includes("")) {
        throw createError(400, "Todos los campos son obligatorios");
      }
      let user = await User.findOne({
        email,
      });

      if (!user) {
        throw createError(404, "Credenciales invalidas");
      }

      if (!user.checked) {
        throw createError(404, "Tu cuenta no ha sido confirmada");
      }
      if (!(await user.checkedPassword(password))) {
        throw createError(404, "Credenciales invalidas");
      }
        return res.status(200).json({
          ok: true,
          msg: "Usuario Logueado",
          user: {
            name: user.name,
            _id: user._id,
          },
          token: generateJWT({
            id: user._id,
          }),
        });
      
    } catch (error) {
      return errorResponse(res,error,'Login')
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw createError(400, "El usuario no existe");
      return res.status(200).json({
        ok: true,
        status: 200,
        data: user,
      });
    } catch (error) {
      errorResponse(res, error, "Detail");
    }
  },
  allUser: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        ok: true,
        status: 200,
        data: users,
      });
    } catch (error) {
      errorResponse(res, error, "All users");
    }
  },
  checked: async (req, res) => {
    try {
    } catch (error) {}
  },
  sendToken: async (req, res) => {
    try {
    } catch (error) {}
  },
  verifyToken: async (req, res) => {
    try {
    } catch (error) {}
  },
  changePassword: async (req, res) => {
    try {
    } catch (error) {}
  },
  update: async (req, res) => {
    try {
    } catch (error) {}
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (user.image?.public_id) {
        await deleteImage(user.image.public_id);
      }
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Collection delete",
      });
    } catch (error) {
      errorResponse(res, error, "Remove");
    }
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
