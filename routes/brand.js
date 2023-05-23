const express = require('express')
const router = express.Router()
const {createBrand, detailBrand, list, samsung} = require('../controller/brandController')
router
.post('/create',createBrand)
.get('/detail/:id',detailBrand)
.get('/list', list)
    .get('/test', samsung)


module.exports = router