require ('dotenv').config()
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoDB = require('./database/config')
mongoDB()

const usersRouter = require("./routes/users");
const productsRouter = require('./routes/product')
const commentRouter = require('./routes/comment')
const brandRouter = require('./routes/brand')
const modelRouter = require('./routes/model')

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", usersRouter);
app.use("/api/products",productsRouter)
app.use("/api/comment", commentRouter)
app.use("/api/brand", brandRouter)
app.use("/api/model", modelRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    status: err.status || 500,
    msg: err.message ? err.message : "Ups hubo un error en la app",
  });
});

module.exports = app;
