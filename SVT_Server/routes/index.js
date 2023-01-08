var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/Ana-Sayfa', function(req,res){
  res.render('Ana-Sayfa.hbs', { title: 'Express' });
})

router.get('/Hakkimda', function(req,res){
  res.render('Hakkimda.hbs', { title: 'Express' });
})

router.get('/Iletisim', function(req,res){
  res.render('Iletisim.hbs', { title: 'Express' });
})

router.get('/login', function(req,res){
  res.render('login', { title: 'Express' });
})

router.get('/secret',checkAuth,(req,res)=>{
  res.send('if you are viewing this page that means you are logged in');
})

router.post('/login',(req,res)=>{
  let post = req.body;
  if (post.username === 'john' && post.password === 'johnspassword') {
    req.session.user_id = post.user_id;
    res.redirect('/secret');
  } else {
    res.send('Wrong credentials');
  }
})

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});    


function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}


module.exports = router;
