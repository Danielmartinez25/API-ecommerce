const express = require('express')
const router = express.Router()
const {createBrand, detailBrand} = require('../controller/brandController')
router
.post('/create',createBrand)
.get('/detail/:id',detailBrand)
module.exports = router