let { query } = require('express');
let express = require('express');
const { response, request } = require('../app');
let controlling = require('../public/javascripts/login');
let router = express.Router();
let database = require('../public/javascripts/database');


// controlling(username,password) methodu username ve passwordu kontrol edip injection önlemi alacak.



/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('Ana-Sayfa');
});

router.get('/Ana-Sayfa', function(req,res){
  res.render('Ana-Sayfa', { title: 'Express',session: req.session});
})

router.get('/Hakkimda', function(req,res){
  res.render('Hakkimda', { title: 'Express' });
})

router.get('/Iletisim', function(req,res){
  res.render('Iletisim', { title: 'Express' });
})

router.get('/secret',checkAuth,(req,res)=>{
  req.body.user_id
  res.status(202).render('secret')
})

router.get('/login', function(req,res){
  res.render('login', { title: 'Express' });
})


router.get('/secret',(req,res)=>{
 if(session.user_id)
 {
  res.render('secret');
 }
 else
 {
  res.send('if you are viewing this page that means you are not logged in', { title: 'Express' });

 }
})

router.post('/login',(req,res,next)=>{
  let username = req.body.username;
  let password = req.body.password;
  const onlyLettersPattern = /^[a-zA-Z0-9.]*$/;

  if(username.match(onlyLettersPattern) && password.match(onlyLettersPattern))
  {
    // SQL INJECTION WITH (')
    query = `SELECT * FROM users WHERE username ='${username}'`;
    database.query(query,(error,data)=>{
      if(data.length > 0)
      {
        for(const user of data)
        {
          if(user.password == password)
          {
            req.session.user_id = user.ID;
            console.log("user ID = "+req.session.user_id);
            res.redirect("/secret")
          }
          else
          {
            res.send("Incorrect Password");
          
          }
        }
      }
      else
      {
        res.send("Incorrect Email Address");
      }
      res.send();
    });
  }
  else if(!username.match(onlyLettersPattern) && !password.match(onlyLettersPattern))
  {
    res.send('No special characters and no numbers, please!');
    res.end();
  }
  else
  {
    res.send('Please Enter Email Address and Password Details');
    res.end();
  }
})

router.get('/logout', function (req, res) {
  delete req.session.destroy();
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
