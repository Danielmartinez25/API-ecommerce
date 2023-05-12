const express = require('express')
const router = express.Router()
const {createBrand, detailBrand} = require('../controller/brandController')
router
.post('/create',createBrand)
.get('/detail',detailBrand)
module.exports = router