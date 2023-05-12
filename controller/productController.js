const Product = require("../database/models/product");
const errorResponse = require("../helpers/errorResponse");
const createError = require('http-errors')

module.exports = {
  create: async (req, res) => {
    const {name,description,color,price,discount,dues,processor,storage,camera,screenSize} = req.body
    console.log(req.body);
    try {
      if (
        [name, description, price, discount, color, price, dues, processor, storage, camera, screenSize].includes("") ||
        !name ||
        !description ||
        !discount ||
        !price ||
        !dues ||
        !processor ||
        !storage ||
        !camera ||
        !screenSize
      )
        throw createError(400, "Todos los campos son obligatorios");
    const product = Product({
      name,
      description,
      color,
      price,
      discount,
      dues,
      processor,
      storage,
      camera,
      screenSize
    })
    const productStore = await product.save()
    return res.status(200).json({
      ok : true,
      status : 200,
      data : productStore
    })
    } catch (error) {
      return errorResponse(res,error,'CreateProduct')
    }
  },
  update: async (req, res) => {},
  detail: async (req, res) => {
    
  },
  listProduct: async (req, res) => {},
  remove: async (req, res) => {},
};