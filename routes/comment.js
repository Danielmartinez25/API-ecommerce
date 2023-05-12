const express = require('express')
const router = express.Router()
const {createComment, detailComment, allComment} = require("../controller/commentController")
router
.post('/create',createComment)
    .get('/detail/:id', detailComment)
    .get('/all',allComment)

module.exports = router