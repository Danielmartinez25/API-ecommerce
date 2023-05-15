const express = require('express')
const router = express.Router()
const { createOrder, OrderNotification } = require('../controller/paymentController')
router
.post('/create-order',createOrder)
.post('/notification',OrderNotification)

module.exports = router