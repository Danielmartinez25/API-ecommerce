const express = require('express')
const router = express.Router()
const {createComment, detailComment} = require("../controller/commentController")
router
.post('/create',createComment)
    .get('/detail/:id', detailComment)

module.exports = router