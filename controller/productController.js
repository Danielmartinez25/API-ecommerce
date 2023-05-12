const Brand = require("../database/models/brand");
const Model = require("../database/models/model");
const Product = require("../database/models/product");
const errorResponse = require("../helpers/errorResponse");
const createError = require('http-errors')

module.exports = {
  create: async (req, res) => {
    const {name,description,color,price,discount,dues,processor,storage,camera,screenSize,brandId,modelId} = req.body
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
    const brand = await Brand.findById(brandId)
    const model = await Model.findById(modelId)
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
      screenSize,
      model,
      brand 
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
    try {
    const {id} = req.params
      const product = await Product.findById(id).populate('model', { _id: 0 ,__v : 0}).populate('brand', { _id: 0 , __v : 0}).populate('comment', {_id : 0 , product : 0, user : 0, __v: 0})
      return res.status(200).json({
        ok : true,
        status : 200,
        data : product
      })
  } catch (error) {
    return errorResponse(res,error,'Product Detail')
    }
  },
  listProduct: async (req, res) => {},
  remove: async (req, res) => {},
};