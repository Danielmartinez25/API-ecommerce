const express = require('express')
const router = express.Router()
const {create,update,remove,detail,listProduct, paginate} = require('../controller/productController')

router
.get('/detail/:id',detail)
.get('/list',listProduct)
.get('/paginate',paginate)
.put('/update/:id',update)
.post('/create',create)
.delete('/remove',remove)
module.exports = router