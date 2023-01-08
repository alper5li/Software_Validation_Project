let { query } = require('express');
let express = require('express');
//const { response, request } = require('../app');
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


router.get('/loginError3', function(req,res){
  res.render('loginError3', { title: 'Express' });
})


router.get('/loginError4', function(req,res){
  res.render('loginError4', { title: 'Express' });
})



router.get('/login', function(req,res){
  res.render('login', { title: 'Express' });
})


router.get('/secret',checkAuth,(req,res)=>{
  console.log(req.body.user_id);
  res.status(202).render('secret')
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
            res.redirect("loginError3");
          
          }
        }
      }
      else
      {
        res.redirect("loginError4");
      }
      res.send();
    });
  }
  else if(!username.match(onlyLettersPattern) && !password.match(onlyLettersPattern))
  {
    //No Special characters and no numbers, please!
    res.render('loginError1');
    res.end();
  }
  else
  {
    //Please Enter Email Addres and Password Details
    res.render('loginError2');
    res.end();
  }
})

router.get('/logout', function (req, res) {
  delete req.session.destroy();
  res.redirect('/login');
});    


function checkAuth(req, res, next) {
  if (!req.session.user_id) 
  {
    res.render('403');
  } 
  else {
    next();
  }
}


router.post('/message',checkIsEmpty,(req,res)=>{
  let name =Buffer.from(req.body.name, 'utf-8').toString();
  let email = Buffer.from(req.body.email, 'utf-8').toString();
  let message = Buffer.from(req.body.message, 'utf-8').toString();
  query = "INSERT INTO messages (name, email, message) VALUES ?";
  let VALUES =[[name,email,message]];
  database.query(query,[VALUES],(error,data)=>{
    if(error) 
    {
      console.log('\x1b[33m%s\x1b[0m',"Error while inserting data [" + error+"]");
      res.status(200).render('IletisimError');
    }
    else
    {
      console.log("Record added.")
      res.status(200).render('IletisimSuccess');
    }
    
  });
});


function checkIsEmpty(req,res,next)
{
  if(
    checkEmpty(req.body.name) && 
    checkEmpty(req.body.email) && 
    checkEmpty(req.body.message) 
    )
    {
      next();
    }
    else{
      res.send("Message didnt sent !")
    }
    
}


function checkEmpty(element)
{
  return !(element === null || element === "");
}
module.exports = router;
