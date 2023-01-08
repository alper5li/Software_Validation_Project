var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Ana-Sayfa', function(req,res,next){
  res.render('Ana-Sayfa.hbs', { title: 'Express' });
})

router.get('/Hakkimda', function(req,res,next){
  res.render('Hakkimda.hbs', { title: 'Express' });
})

router.get('/Iletisim', function(req,res,next){
  res.render('Iletisim.hbs', { title: 'Express' });
})

router.get('/login', function(req,res,next){
  res.render('login', { title: 'Express' });
})

module.exports = router;
