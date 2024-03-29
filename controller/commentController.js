const Comment = require("../database/models/comment")
const User = require("../database/models/user")
const Product = require("../database/models/product")
const errorResponse = require("../helpers/errorResponse")

module.exports = {
    createComment: async (req, res) => {
        try {
            const { comment, userId, productId } = req.body
            const user = await User.findById(userId)
            const product = await Product.findById(productId)
            const newComment = Comment({
                comment,
                user: user._id,
                product: product._id
            })
            const savedComment = await newComment.save()
            user.comment = newComment || user.comment
            await user.save()
            product.comment = newComment || user.comment
            await product.save()
            return res.status(200).json({
                ok: true,
                status: 200,
                data: savedComment
            })
        } catch (error) {
            return errorResponse(res, error, 'Comment create')
        }

    },
    detailComment: async (req, res) => {
        try {
            const { id } = req.params
            const comment = await Comment.findById(id).populate('product', { name: 1, price: 1, description: 1, _id: 0 }).populate('user', { name: 1, email: 1, _id: 0 })
            return res.status(200).json({
                ok: true,
                status: 200,
                data: comment
            })
        } catch (error) {
            return errorResponse(res,error,'Comment Detail')
        }
    },
    allComment : async(req,res) =>{
        try {
            const comment = await Comment.find({}, { _id: 0, __v: 0 }).populate('product', { name: 1, price: 1, description: 1, _id: 0 }).populate('user', { name: 1, email: 1, _id: 0 })
            return res.status(200).json({
                ok: true,
                status: 200,
                data: comment
            })
        } catch (error) {
            return errorResponse(res,error,'All comment')
        }
    },
    removeAll: async (req, res) => {
        try {
            await Comment.deleteMany()
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Comment Delete'
            })
        } catch (error) {
            return errorResponse(res, error, 'Remove All')
        }
    },
}