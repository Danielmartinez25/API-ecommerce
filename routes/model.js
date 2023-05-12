const express = require('express')
const router = express.Router()
const {createModel} = require('../controller/modelController')
router
.post('/create',createModel)

module.exports = router