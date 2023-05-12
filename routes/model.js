const express = require('express')
const router = express.Router()
const {createModel, detailModel} = require('../controller/modelController')
router
.post('/create',createModel)
.get('/detail/:id',detailModel)

module.exports = router