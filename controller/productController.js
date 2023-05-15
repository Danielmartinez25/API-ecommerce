const Brand = require("../database/models/brand");
const Model = require("../database/models/model");
const Product = require("../database/models/product");
const errorResponse = require("../helpers/errorResponse");
const createError = require('http-errors');
module.exports = {
  create: async (req, res) => {
    const { name, description, color, price, discount, dues, processor, storage, camera, screenSize, brandId, modelId } = req.body
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
        ok: true,
        status: 200,
        data: productStore
      })
    } catch (error) {
      return errorResponse(res, error, 'CreateProduct')
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const {
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
      } = req.body
      const product = await product.findById(id)
      product.name = name || product.name
      product.description = description || product.description
      product.color = color || product.color
      product.price = price || product.price
      product.discount = discount || product.discount
      product.dues = dues || product.dues
      product.processor = processor || product.processor
      product.storage = storage || product.storage
      product.camera = camera || product.camera
      product.screenSize = screenSize || product.screenSize
      productUpdate = await product.save()
      return res.status(200).json({
        ok: true,
        status: 200,
        data: productUpdate
      })
    } catch (error) {
      return errorResponse(res, error, 'Update Product')
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id).populate('model', { _id: 0, __v: 0 }).populate('brand', { _id: 0, __v: 0 }).populate('comment', { _id: 0, product: 0, user: 0, __v: 0 })
      return res.status(200).json({
        ok: true,
        status: 200,
        data: product
      })
    } catch (error) {
      return errorResponse(res, error, 'Product Detail')
    }
  },
  listProduct: async (req, res) => {
    try {
      const products = await Product.find()
      return res.status(200).json({
        ok: true,
        status: 200,
        data: products
      })
    } catch (error) {
      return errorResponse(res, error, 'List Product')
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params
      await Product.findByIdAndDelete(id)
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: 'Product Delete'
      })
    } catch (error) {
      return errorResponse(res, error, 'Remove')
    }

  },
  paginate : async(req,res) =>{
    try {
      const {limit,page} = req.query 
      const option = {
        limit,
        page 
      }
      const product = await Product.paginate({},option,populate)
      
      return res.status(200).json({
        ok: true,
        status: 200,
        product
      })

    } catch (error) {
      return errorResponse(res,error,'Paginate')
    }
  }
};