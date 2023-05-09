const createError = require("http-errors");
const User = require("../database/models/user");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { confirmRegister, forgotPassword } = require("../helpers/sendMail");
const errorResponse = require("../helpers/errorResponse");
const { uploadImage, deleteImage } = require("../helpers/uploadImage");
const fs = require("fs-extra");
const generateJWT = require("../helpers/generateJWT");
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
    const { email, password } = req.body;
    try {
      console.log(req.body);
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
      console.log(user.checked);
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
      return errorResponse(res, error, "Login");
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
      if (!users)
        throw createError(400, "no se encontraron colecciones en database");
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
      const { token } = req.query;
      if (!token) throw createError(400, "Token inexistente");
      const user = await User.findOne({
        token,
      });
      if (!user) throw createError(400, "Token invalido");
      user.checked = true;
      user.token = "";
      await user.save();
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Usuario checkeado",
      });
    } catch (error) {
      return errorResponse(res, error, "Checked");
    }
  },
  sendToken: async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await User.findOne({
        email,
      });
      if (!user)
        throw createError(
          400,
          "El email no se encuentra en nuestra base de datos"
        );
      const token = generateTokenRandom();
      user.token = token;
      await user.save();
      await forgotPassword({
        name: user.name,
        email: user.email,
        token: user.token,
      });
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Verifique su casilla de mensajes",
      });
    } catch (error) {
      return errorResponse(res, error, "Send-Token");
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.query;
    try {
      if (!token) throw createError(400, "No hay token en la petición");
      const user = await User.findOne({
        token,
      });
      if (!user) throw createError(400, "Token inexistente");
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Token verificado",
      });
    } catch (error) {
      return errorResponse(res, error, "Verify-token");
    }
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      if(!token) throw createError(400,'Token inexistente')
      const { password } = req.body;
      const user = await User.findOne({
        token,
      });
      if(!user) throw createError(400,'El token es invalido')
      user.password = password;
      user.token = "";
      await user.save();
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Change Password",
      });
    } catch (error) {
      return errorResponse(res, error, "Change-Password");
    }
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
