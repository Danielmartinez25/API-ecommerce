const Model = require('../database/models/model')
const Brand = require('../database/models/brand')
const errorResponse = require('../helpers/errorResponse')
module.exports = {
    createModel : async(req,res) => {
        try {
        const {name,brandId} = req.body
        const brand = Brand.findById(brandId)
        const model = Model({name, brand })
        const modelStore = await model.save()
        return res.status(200).json({
            ok : true,
            status : 200,
            data : modelStore
        })
        } catch (error) {
        return errorResponse(res,error,'Model Create')
        }
    }
}
 