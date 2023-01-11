let { query } = require('express');
let express = require('express');
let router = express.Router();
let database = require('../public/javascripts/database');

//const { response, request } = require('../app');

// controlling(username,password) methodu username ve passwordu kontrol edip injection önlemi alacak.



/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('Ana-Sayfa');
  
});

router.get('/adminPage',checkAuth,function(req,res){
  console.log(req.body.user_id);
  res.status(202).render('adminPage',{ title: 'Express',session: req.session});
  
})

router.get('/messageData',checkAuth,getData);





router.get('/Ana-Sayfa', function(req,res){
  res.render('Ana-Sayfa', { title: 'Express',session: req.session});
})

router.get('/Hakkimda', function(req,res){
  res.render('Hakkimda', { title: 'Express' });
})

router.get('/Iletisim', function(req,res){
  res.render('Iletisim', { title: 'Express' });
})

router.get('/loginError1', function(req,res){
  res.render('loginError1', { title: 'Express' });
})

router.get('/loginError2', function(req,res){
  res.render('loginError2', { title: 'Express' });
})

router.get('/loginError3', function(req,res){
  res.render('loginError3', { title: 'Express' });
})  

router.get('/loginError4', function(req,res){
  res.render('loginError4', { title: 'Express' });
})

router.get('/IletisimErrorSpecial', function(req,res){
  res.render('IletisimErrorSpecial', { title: 'Express' });
})

router.get('/IletisimErrorEmpty', function(req,res){
  res.render('IletisimErrorEmpty', { title: 'Express' });
})

router.get('/IletisimErrorEmail', function(req,res){
  res.render('IletisimErrorEmail', { title: 'Express' });
})

router.get('/login',checkattempt, function(req,res){
  res.render('login', { title: 'Express' });
})


router.get('/secret',checkAuth,(req,res)=>{
  console.log(req.body.user_id);
  res.status(202).render('secret')
})

function checkattempt(req,res,next)
{
  if(req.session.user_id == "DISABLED.")
  {
    res.render('403')
  }
  else
  {
    next();
  }
}

let attemptCount =0;
router.post('/login',(req,res,next)=>{
  let username = req.body.username;
  let password = req.body.password;
  const onlyLettersPattern = /^[a-zA-Z0-9.]*$/;
  
  if(req.session.user_id == "DISABLED.")
  {
    console.log("TEST");
    res.render('403');
    setTimeout(function()
    {
      attemptCount =0;
      req.session.user_id="";
    }, 15000);
  }
  else if(

    username.match(onlyLettersPattern) && 
    password.match(onlyLettersPattern) &&
    checkSpecial(username) &&
    checkSpecial(password) &&
    checkEmpty(username) &&
    checkEmpty(password)
  )
  {
    console.log(attemptCount)
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
            res.redirect("/adminPage")
          }
          else
          {
            attemptCount++;
            if(attemptCount == 4)
            {
              req.session.user_id="DISABLED."
            }
            res.redirect("loginError3");
          
          }
        }
      }
      else
      {
        
        attemptCount++;
        if(attemptCount == 4)
        {
          req.session.user_id="DISABLED."
        }
        res.redirect("loginError4");
      }
      res.send();
    });
  }
  else if(!username.match(onlyLettersPattern) || !password.match(onlyLettersPattern))
  {
    
    attemptCount++;
    if(attemptCount == 4)
    {
      req.session.user_id="DISABLED."
    }
    //No Special characters and no numbers, please!
    res.redirect('loginError1');
    res.end();
  }
  else
  {
    
    attemptCount++;
    if(attemptCount == 4)
    {
      req.session.user_id="DISABLED."
    }
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


router.post('/message',checkInput,(req,res)=>{
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


function checkInput(req,res,next)
{
  if
  (
    checkEmpty(req.body.name) && 
    checkEmpty(req.body.email) && 
    checkEmpty(req.body.message) 
  )
  {
    if
    (checkemail(req.body.email))
    {
      if(checkSpecial(req.body.name) && checkSpecial(req.body.message))
      {
        next();
      }
      else 
      {
        res.redirect("IletisimErrorSpecial");
      }
      
    }
    else
    {
      res.redirect("IletisimErrorEmail");
    }
  }
  else 
  {
    res.redirect("IletisimErrorEmpty")
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

  spaceChars =[
    " ",
    "\t",
    "\n",
    "\r",
    "\x0b",
    "\x0c"
  ]
for(let mailExt of mailExtensions)
{
  
  if(element.includes(mailExt))
  {
    for(let spChars of spaceChars)
    {
      if(!element.includes(spChars))
      {
        return true;
      }
    }
  }
    
}

}

function checkSpecial(element)
{
  specialChars =[
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
  if(!element.includes(specialChars[i]))
  return true
}

}

function getData(req,res)
{
    
    
    
    query = "SELECT * FROM messages;";
  
    database.query(query,function(err,data)
    {
    if(err) throw err;
    txt = `<table class="table table-dark">`;
    txt+=`<thead>`
    txt+=`<tr>`;
    txt+=`<th>ID</th>`;
    txt+=`<th>Name</th>`;
    txt+=`<th>E-mail</th>`;
    txt+=`<th>Message</th>`;
    txt+=`</tr>`;
    txt+=`</thead>`

    for(let messages of data)
          {
            txt+=`<tbody>`;
            txt+=`<tr id="${messages.ID}">`;
            txt+=`<td>${messages.ID}</td>`;
            txt+=`<td>${messages.name}</td>`;
            txt+=`<td>${messages.email}</td>`;
            txt+=`<td>${messages.message}</td>`;
            txt+=`</tr>`;
            txt+=`</tbody>`;
          }
        txt += `</table>`;
    console.log("txt:" +txt)
    res.status(200).send(getHTMLMessage(txt));
      }
    )
    

}

function getHTMLMessage(data)
{
  return `<!DOCTYPE html>
  <html>
  <head>
    <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
    <link rel="stylesheet" href="/static/stylesheets/nicepage.css" media="screen">
    <link rel='stylesheet' href='/static/stylesheets/secret.css' />
    <link rel='stylesheet' href='/static/stylesheets/login.css' />
    <link id="u-theme-google-font" rel="stylesheet" href="/static/stylesheets/googleapi1.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script class="u-script" type="text/javascript" src="/static/javascripts/jquery.js" defer></script>
    <script class="u-script" type="text/javascript" src="/static/javascripts/nicepage.js" defer></script>
  </head>
  <body class="u-body u-xl-mode" data-lang="tr">
  
    <header class="u-clearfix u-grey-90 u-header u-header" id="sec-405b"><div class="u-clearfix u-sheet u-sheet-1">
          <a href="Ana-Sayfa" class="u-image u-logo u-image-1" data-image-width="4000" data-image-height="4000">
            <img src="/static/images/Dragon-logo-symbol-on-transparent-background-PNG.png" class="u-logo-image u-logo-image-1">
          </a>
          <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1">
            <div class="menu-collapse" style="font-size: 1.5rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
              <a class="u-button-style u-custom-active-border-color u-custom-active-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-hover-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-text-shadow u-custom-text-shadow-blur u-custom-text-shadow-color u-custom-text-shadow-transparency u-custom-text-shadow-x u-custom-text-shadow-y u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
                <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
                <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
  </g></svg>
              </a>
            </div>
            <div class="u-custom-menu u-nav-container">
              <ul class="u-nav u-spacing-30 u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-hover-palette-3-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-custom-color-1 u-text-hover-palette-3-light-1 u-text-white" id="Ana Sayfa" href="Ana-Sayfa" style="padding: 8px 22px;">Ana Sayfa</a>
  </li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-hover-palette-3-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-custom-color-1 u-text-hover-palette-3-light-1 u-text-white" id="Hakkimda" href="Hakkimda" style="padding: 8px 22px;">Hakkımda</a>
  </li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-hover-palette-3-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-custom-color-1 u-text-hover-palette-3-light-1 u-text-white" id="Iletisim" href="Iletisim" style="padding: 8px 22px;">İletişim</a>
  </li><li class="u-nav-item"><a class="u-border-2 u-border-active-custom-color-1 u-border-hover-palette-3-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-custom-color-1 u-text-hover-palette-3-light-1 u-text-white" id="Login" href="login" style="padding: 8px 22px;">Giriş Yap</a>
  </li></ul>
            </div>
            <div class="u-custom-menu u-nav-container-collapse">
              <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                <div class="u-inner-container-layout u-sidenav-overflow">
                  <div class="u-menu-close"></div>
                  <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" id="Ana Sayfa2" href="Ana-Sayfa">Ana Sayfa</a>
  </li><li class="u-nav-item"><a class="u-button-style u-nav-link" id="Hakkimda2" href="Hakkimda">Hakkımda</a>
  </li><li class="u-nav-item"><a class="u-button-style u-nav-link" id="Iletisim2" href="Iletisim">İletişim</a>
  </li><li class="u-nav-item"><a class="u-button-style u-nav-link" id="Login2" href="login">Giriş Yap</a>
  </li></ul>
                </div>
              </div>
              <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
          </nav>
          <h1 class="u-custom-font u-font-georgia u-text u-text-grey-30 u-title u-text-1" data-animation-name="customAnimationIn" data-animation-duration="2000" data-animation-delay="0">Alper Be​şli </h1>
        </div></header>
    <div>
      <h2>Message Inbox</h2>
    </div>
    <div id="MessageBox">
      ${data}
    </div>
  </body>
  </html>
  `
}

router.get('*',(req,res)=>
{
  res.status(404).render('403');
})

module.exports = router;

