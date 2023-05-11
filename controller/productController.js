const Product = require("../database/models/product");
const errorResponse = require("../helpers/errorResponse");

module.exports = {
  create: async (req, res) => {
    const {name,description,color,price,discount,dues,processor,storage,camera,screenSize} = req.body
    try {
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
  detail: async (req, res) => {},
  listProduct: async (req, res) => {},
  remove: async (req, res) => {},
};