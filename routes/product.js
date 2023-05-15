const express = require('express')
const router = express.Router()
const { create, update, remove, detail, list, paginate, search, removeAll } = require('../controller/productController')

router
    .get('/detail/:id', detail)
    .get('/list', list)
    .get('/search', search)
    .get('/paginate', paginate)
    .put('/update/:id', update)
    .post('/create', create)
    .delete('/remove', remove)
    .delete('/remove-all', removeAll)


module.exports = router