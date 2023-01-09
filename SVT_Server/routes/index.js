let { query } = require('express');
let express = require('express');
//const { response, request } = require('../app');
let controlling = require('../public/javascripts/login');
let router = express.Router();
let database = require('../public/javascripts/database');
const e = require('express');


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

router.get('/loginError2', function(req,res){
  res.render('loginError2', { title: 'Express' });
})

router.get('/loginError1', function(req,res){
  res.render('loginError1', { title: 'Express' });
})


router.get('/loginError4', function(req,res){
  res.render('loginError4', { title: 'Express' });
})

router.get('/IletisimErrorSpecial', function(req,res){
  res.render('IletisimErrorSpecial', { title: 'Express' });
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
  else if(!username.match(onlyLettersPattern) || !password.match(onlyLettersPattern))
  {
    //No Special characters and no numbers, please!
    res.redirect('loginError1');
    res.end();
  }
  else
  {
    //Please Enter Email Addres and Password Details
    res.redirect('loginError2');
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
    checkEmpty(req.body.message) &&
    checkemail(req.body.email) &&
    checkSpecial(req.body.name) &&
    checkSpecial(req.body.message)
    )
    {
      next();
    }
    else{
      res.redirect("IletisimErrorSpecial")
    }
    
}


function checkEmpty(element)
{
  return !(element === null || element === "");
}

function checkemail(element)
{
  mailExtensions = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@aol.com",
  "@hotmail.co.uk",
  "@hotmail.fr",
  "@msn.com",
  "@yahoo.fr",
  "@wanadoo.fr",
  "@orange.fr",
  "@comcast.net",
  "@yahoo.co.uk",
  "@yahoo.com.br",
  "@yahoo.co.in",
  "@live.com",
  "@rediffmail.com",
  "@free.fr",
  "@gmx.de",
  "@web.de",
  "@yandex.ru",
  "@ymail.com",
  "@libero.it",
  "@outlook.com",
  "@uol.com.br",
  "@bol.com.br",
  "@mail.ru",
  "@cox.net",
  "@hotmail.it",
  "@sbcglobal.net",
  "@sfr.fr",
  "@live.fr",
  "@verizon.net",
  "@live.co.uk",
  "@googlemail.com",
  "@yahoo.es",
  "@ig.com.br",
  "@live.nl",
  "@bigpond.com",
  "@terra.com.br",
  "@yahoo.it",
  "@neuf.fr",
  "@yahoo.de",
  "@alice.it",
  "@rocketmail.com",
  "@att.net",
  "@laposte.net",
  "@facebook.com",
  "@bellsouth.net",
  "@yahoo.in",
  "@hotmail.es",
  "@charter.net",
  "@yahoo.ca",
  "@yahoo.com.au",
  "@rambler.ru",
  "@hotmail.de",
  "@tiscali.it",
  "@shaw.ca",
  "@yahoo.co.jp",
  "@sky.com",
  "@earthlink.net",
  "@optonline.net",
  "@freenet.de",
  "@t-online.de",
  "@aliceadsl.fr",
  "@virgilio.it",
  "@home.nl",
  "@qq.com",
  "@telenet.be",
  "@me.com",
  "@yahoo.com.ar",
  "@tiscali.co.uk",
  "@yahoo.com.mx",
  "@voila.fr",
  "@gmx.net",
  "@mail.com",
  "@planet.nl",
  "@tin.it",
  "@live.it",
  "@ntlworld.com",
  "@arcor.de",
  "@yahoo.co.id",
  "@frontiernet.net",
  "@hetnet.nl",
  "@live.com.au",
  "@yahoo.com.sg",
  "@zonnet.nl",
  "@club-internet.fr",
  "@juno.com",
  "@optusnet.com.au",
  "@blueyonder.co.uk",
  "@bluewin.ch",
  "@skynet.be",
  "@sympatico.ca",
  "@windstream.net",
  "@mac.com",
  "@centurytel.net",
  "@chello.nl",
  "@live.ca",
  "@aim.com",
  "@bigpond.net.au"]

for(let i=0;i<mailExtensions.length;i++)
{
  if(element.includes(mailExtensions[i]) && !element.includes(" "))
  return true
}

  
  
  

  


  
}

function checkSpecial(element)
{
  specialChars =[
    "!",
    "@",
    "'",
    "-",
    "_",
    "#",
    "&",
    "/",
    "=",
    "^",
    ">",
    "<",
    '"',
  ]

  
for(let i=0;i<specialChars.length;i++)
{
  if(element.includes(mailExtensions[i]))
  return true
}

}

module.exports = router;
