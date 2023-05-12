const Brand = require('../database/models/brand')
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
            const brand = await Brand.findById(id)
            return res.status(200).json({
                ok: true,
                status: 200,
                data: brand
            })   
        } catch (error) {
            return errorResponse(res, error, 'Brand Detail')
        }
    }
}