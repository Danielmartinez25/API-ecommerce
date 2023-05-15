const express = require('express')
const router = express.Router()
const { createComment, detailComment, allComment, removeAll } = require("../controller/commentController")
router
    .post('/create', createComment)
    .get('/detail/:id', detailComment)
    .get('/all', allComment)
    .delete('/remove', removeAll)

module.exports = router