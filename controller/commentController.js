const Comment = require("../database/models/comment")
const User = require("../database/models/user")
const Product = require("../database/models/product")


module.exports = {
    createComment: async (req, res) => {
        try {
            const { comment, userId, productId, date } = req.body
            console.log(req.body);
            const user = await User.findById(userId)
            const product = await Product.findById(productId)
            const newComment = new Comment({
                comment,
                date,
                user : user._id,
                product : product._id
            })
            const savedComment = await newComment.save()
            user.comment = await user.comment.concat(savedComment._id)
            await user.save()
            product.comment = await product.comment.concat(savedComment._id)
            await product.save()
            return res.status(200).json({
                ok: true,
                status: 200,
                data: savedComment
            })
        } catch (error) {

        }

    }

}