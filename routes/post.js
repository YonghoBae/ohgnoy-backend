var express = require('express');
var router = express.Router();

router.get('/list', async(req,res)=>{
    res.render('study/list');
});

router.get('/create', async(req,res)=>{
    res.render('study/create');
});

// router.post();

router.get('/modify', async(req,res)=>{
    res.render('study/modify');
});

// router.post();

module.exports = router;