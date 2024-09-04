var express = require("express");
var router = express.Router();

var db = require("../models/index.js");

var encrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

router.get("/", async (req, res, next) => {
  res.render("index", { title: "BackEnd API" });
});

router.get("/token", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    var token = req.headers.authorization.split("Bearer ")[1];
    const loginUser = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    apiResult.code = 200;
    apiResult.data = loginUser;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "ServerError";
  }

  return res.json(apiResult);
});

router.post("/entry", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    nick_name = req.body.nick_name;
    email = req.body.email;
    password = req.body.password;

    const existEmail = await db.User.findOne({
      where: { email },
    });
    const existNickName = await db.User.findOne({
      where: { nick_name },
    });

    if (existEmail) {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "ExistEmail";
      return res.json(apiResult);
    } else if (existNickName) {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "ExistNickName";
      return res.json(apiResult);
    }

    const entryPassword = await encrypt.hash(password, 12);

    const entryUser = {
      nick_name,
      email,
      password: entryPassword,
    };

    let registedUser = await db.User.create(entryUser);
    registedUser.password = "";

    apiResult.code = 200;
    apiResult.data = registedUser;
    apiResult.msg = "Sccess";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "ServerError";
    console.log(err);
  }

  res.json({ apiResult });
});

router.post("/login", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const email = req.body.email;
    const password = req.body.password;

    const dbUser = await db.User.findOne({ where: { email } });

    if (dbUser) {
      const comparePassword = await encrypt.compare(password, dbUser.password);
      if (comparePassword) {
        const tokenData = {
          email: dbUser.email,
          nick_name: dbUser.nick_name,
          user_id: dbUser.user_id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_AUTH_KEY, {
          expiresIn: "24h",
          issuer: "BYH",
        });

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = "Ok";
      } else {
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = "InCorrectPassword";
      }
    } else {
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "NotExitEmail";
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.msg = "ServerError";
  }

  res.json(apiResult);
});

router.post("/email", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  const smtpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PW,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  var randNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

  const email = req.body.email;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Ohgnoy 메일 인증",
    html: "인증번호를 입력해주세요 \n\n\n\n\n\n" + randNum,
  };

  try{
    const info = await smtpTransport.sendMail(mailOptions);
    console.log(info);
    apiResult.code = 200;
    apiResult.data = randNum;
    apiResult.msg = "SendMail";
  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "ServerError";
  }

  res.json(apiResult);
});

module.exports = router;
