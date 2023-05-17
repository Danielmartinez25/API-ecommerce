const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const {detail,allUser,update,remove,login,register,changePassword,checked,sendToken,verifyToken, removeAll} = require('../controller/userController');
const { verifyIsAdmin, verifyIsModerator } = require('../middleware/checkToken');
router
  .get("/detail/:id", detail)
  .get("/all",verifyIsModerator, allUser)
  .put("/update/:id", update)
  .post("/login", login)
  .post("/register",fileUpload({useTempFiles: true,tempFileDir: "./uploads"}),register)
  .delete("/remove/:id",verifyIsAdmin, remove)
  .delete("/remove",verifyIsAdmin, removeAll)
  .get("/checked", checked)
  .post("/send-token", sendToken)
  .route("/reset-password")
  .get(verifyToken)
  .post(changePassword);


module.exports = router;


