const express = require('express')
const router = express.Router()
const {createModel, detailModel,list} = require('../controller/modelController')
router
.post('/create',createModel)
.get('/detail/:id',detailModel)
.get('/list', list)


module.exports = router