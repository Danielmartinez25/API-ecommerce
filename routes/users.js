const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const {detail,allUser,update,remove,login,register,changePassword,checked,sendToken,verifyToken, removeAll} = require('../controller/userController')
router
  .get("/detail/:id", detail)
  .get("/all", allUser)
  .put("/update/:id", update)
  .post("/login", login)
  .post("/register",fileUpload({useTempFiles: true,tempFileDir: "./uploads"}),register)
  .delete("/remove/:id", remove)
  .delete("/remove", removeAll)
  .get("/checked", checked)
  .post("/send-token", sendToken)
  .route("/reset-password")
  .get(verifyToken)
  .post(changePassword);


module.exports = router;


