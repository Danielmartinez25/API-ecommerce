const express = require('express');
const router = express.Router();
const {detail,allUser,update,remove,login,register,changePassword,checked,sendToken,verifyToken} = require('../controller/userController')
router
  .get("/user/:id", detail)
  .get("/users", allUser)
  .put("/update/:id", update)
  .post("/login", login)
  .post("/register", register)
  .delete("/remove/:id", remove)
    .get('/checked',checked)
    .post('/send-token',sendToken)
    .route('/reset-password')
        .get(verifyToken)
        .post(changePassword)


module.exports = router;


