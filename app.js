var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studysRouter = require("./routes/study");
var postRouter = require("./routes/post");

var sequelize = require("./models/index.js").sequelize;

const cors = require("cors");

var app = express();

sequelize.sync();


//모든 웹사이트/모바일 프론트에서 RESTAPI를 접근할수 있게 허락함
app.use(cors());

// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     origin: ["http://localhost:3000"],
//   })
// );


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/study", studysRouter);
app.use("/post", postRouter);

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
