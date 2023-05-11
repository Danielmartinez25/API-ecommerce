const express = require('express')
const router = express.Router()
const {create,update,remove,detail,listProduct} = require('../controller/productController')

router
.get('/detail/:id',detail)
.get('/list',listProduct)
.put('/update/:id',update)
.post('/create',create)
.delete('/remove',remove)
module.exports = router