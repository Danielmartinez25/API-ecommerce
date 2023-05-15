const Model = require('../database/models/model')
const Brand = require('../database/models/brand')
const errorResponse = require('../helpers/errorResponse')
module.exports = {
    createModel : async(req,res) => {
        try {
        const {name} = req.body
        const model = Model({name})
        const modelStore = await model.save()
        return res.status(200).json({
            ok : true,
            status : 200,
            data : modelStore
        })
        } catch (error) {
        return errorResponse(res,error,'Model Create')
        }
    },
    detailModel : async(req,res) =>{
        try {
            const {id} = req.params
            const model = await Model.findById(id)
            return res.status(200).json({
                ok: true,
                status: 200,
                data: model
            })
        } catch (error) {
            return errorResponse(res,error,'Model Detail')
        }
    },
    list: async (req, res) => {
        try {
            const model = await Model.find({},{ __v : 0})
            return res.status(200).json({
                ok: true,
                status: 200,
                data: model
            })
        } catch (error) {
            return errorResponse(res, error, 'List Model')
        }
    },
}
 