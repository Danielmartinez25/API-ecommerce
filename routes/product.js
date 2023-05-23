const express = require('express')
const router = express.Router()
const { create, update, remove, detail, list, paginate, search, removeAll, offer,samsung } = require('../controller/productController')
const { checkToken, verifyIsModerator, verifyIsAdmin } = require('../middleware/checkToken')

router
    .get('/detail/:id', detail)
    .get('/list', list)
    .get('/search', search)
    .get('/test',samsung)
    .get('/paginate', paginate)
    .put('/update/:id',verifyIsAdmin,update)
    .post('/create',checkToken,verifyIsAdmin, create)
    .delete('/remove/:id',verifyIsAdmin, remove)
    .delete('/remove-all', removeAll)


module.exports = router