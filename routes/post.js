var express = require("express");
const db = require("../models");
const multer = require("multer");

var router = express.Router();
const multer = require("multer");

// Multer 설정: 파일이 저장될 위치와 파일 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 파일이 저장될 경로 설정
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // 파일 이름 설정
  },
});

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // 이미지 파일 허용
  } else {
    cb(new Error("Only image files are allowed!"), false); // 이미지 파일이 아닐 경우
  }
};

// Multer 미들웨어 설정
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 파일 크기 제한: 5MB
});



router.get("/list", async (req, res) => {
  let apiResult = {
    data: null,
    msg: "",
  };

  try {
    const postList = await db.Post.findAll();

    apiResult.data = postList;
    apiResult.msg = "Success";
  } catch (err) {
    apiResult.data = null;
    apiResult.msg = "ServerError";
  }

  res.status(200).json(apiResult);
});


router.post("/create", upload.single("coverImage"), async (req, res) => {
  let apiResult = {
    data: null,
    msg: "",
  };

  try {
    var token = req.headers.authorization.split("Bearer ")[1];
    const loginUser = await jwt.verify(token, process.env.JWT_AUTH_KEY);

    let coverImagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      coverImage: coverImagePath,
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

router.post("/modify/:id", async (req, res) => {
  let apiResult = {
    data: null,
    msg: "",
  };

  try {
  } catch (err) {}

  res.status(200).json(apiResult);
});

module.exports = router;
