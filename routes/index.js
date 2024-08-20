var express = require("express");
var router = express.Router();

var db = require("../models/index.js");

var encrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

router.get("/",async(req,res,next)=>{
  res.render("index",{title:"BackEnd API"});
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

    const entryPassword = await encrypt.hash(password,12);

    const entryUser = {
      nick_name,
      email,
      password: entryPassword,
    };

    let registedUser = await db.User.create(entryUser);
    registedUser.password = "";

    apiResult.code = 200;
    apiResult.data = registedUser;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "회원가입 실패입니다.";
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
      apiResult.msg = "NotExitPassword";
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
});

module.exports = router;
