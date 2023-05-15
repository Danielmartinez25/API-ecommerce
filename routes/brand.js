const express = require('express')
const router = express.Router()
const {createBrand, detailBrand, list} = require('../controller/brandController')
router
.post('/create',createBrand)
.get('/detail/:id',detailBrand)
.get('/list', list)

module.exports = router