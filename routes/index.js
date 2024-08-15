var express = require("express");
var router = express.Router();

var db = require('../models/index.js');
//동적SQL쿼리를 직접 작성해서 전달하기 위한 참조
var sequelize = db.sequelize;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", async (req, res) => {
  let apiResult = {
    code: 200,
    msg: "",
  };

  try {
    const email = req.body.email;
    const password = req.body.password;

    const dbUser = {
      email: "test@naver.com",
      password: "testpassword",
    };

    if (true) {
      apiResult.code = 200;
      apiResult.msg = "Ok";
    } else {
      apiResult.code = 502;
      apiResult.msg = "존재하지않는 패스워드입니다.";
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.msg = "관리자에게 문의하세요.";
  }

  res.json({ apiResult });
});

router.post("/entry", async (req, res) => {
  let apiResult = {
    code: 200,
    msg: "",
  };

  const entryUser = {
    nick_name: req.body.nick_name,
    email: req.body.email,
    password: req.body.password,
  };

  console.log(entryUser);

  try {
    const registedUser = await db.User.create(entryUser);
    apiResult.code = 200;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.msg = "회원가입 실패입니다.";
    console.log(err);
  }

  res.json({ apiResult });
});

module.exports = router;
