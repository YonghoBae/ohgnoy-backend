var express = require("express");
const db = require("../models");
var router = express.Router();

router.get("/list", async (req, res) => {
  let apiResult = {
    data: null,
    msg: "",
  };
  res.json(apiResult);
});

router.post("/create", async (req, res) => {
  let apiResult = {
    data: null,
    msg: "",
  };

  try {
    var token = req.headers.authorization.split("Bearer ")[1];
    const loginUser = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    const post = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      coverImage,
      date: Date.now(),
      author_id: loginUser.user_id,
      view_cnt: 0,
    };

    const createPost = await db.Post.create(post);

    apiResult.data = createPost;
    apiResult.msg = "Success";
  } catch (err) {
    apiResult.data = null;
    apiResult.msg = "ServerError";
    res.status(500).json(apiResult);
  }

  res.status(200).json(apiResult);
});

// router.post();

router.get("/modify", async (req, res) => {
  res.render("study/modify");
});

// router.post();

module.exports = router;
