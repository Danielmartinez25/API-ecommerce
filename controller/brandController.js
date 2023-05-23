const mongoose  = require('mongoose')
const Brand = require('../database/models/brand')
const Product = require('../database/models/product')
const errorResponse = require('../helpers/errorResponse')

module.exports = {
    createBrand : async(req,res) =>{
        try {
        const {name} = req.body
        const brand = Brand({name})
        const brandStore = await brand.save()
        return res.status(200).json({
            ok : true,
            status : 200,
            data : brandStore
        })
        } catch (error) {
            return errorResponse(res,error,'Brand create')
        }
    },
    detailBrand: async (req, res) => {
        try {
            const {id} = req.params
            const brand = await Brand.findById(id, {__v: 0})
            return res.status(200).json({
                ok: true,
                status: 200,
                data: brand
            })   
        } catch (error) {
            return errorResponse(res, error, 'Brand Detail')
        }
    },
    list: async (req, res) => {
        try {
            const brand = await Brand.find({}, { __v: 0 })
            return res.status(200).json({
                ok: true,
                status: 200,
                data: brand
            })
        } catch (error) {
            return errorResponse(res, error, 'List Brand')
        }
    },
    samsung: async (req, res) => {
        try {
            const brandId = '6462bfc9a2619f452d44c452'; // ID de la marca específica

            const samsung = await Product.aggregate([
                {
                    $lookup: {
                        from: 'brand', // Nombre de la colección 'Marcas'
                        localField: 'brand',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                {
                    $match: {
                        'brand': new mongoose.Types.ObjectId(brandId)
                    },
                },
            ])
            return res.status(200).json({
                ok: true,
                status: 200,
                data: samsung
            })
        } catch (error) {
            return errorResponse(res, error, 'Samsung')
        }
    },
}