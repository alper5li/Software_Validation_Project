var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
global.document = new JSDOM('../../views/login.hbs').window.document;
const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('login');
const submit = document.getElementById('submitbutton');




// Validation colors
const green = '#4CAF50';
const red = '#F44336';


// Handle form

if (form !== null) {

  submit.addEventListener('onclick', function (event) 
  {
    event.preventDefault();
    if 
    (
      validateUserName() && validatePassword()
    ) 
    {
      this.submit();
    }
    else 
    {
      alert("No");
    }
  });
}


// Validators
function validateUserName() {
  if (checkIfEmpty(username)) return;
  if (!checkIfOnlyLetters(username)) return;
  return true;
}


function validatePassword() {
  if (checkIfEmpty(password)) return;
  if (!containsCharacters(password)) return;
  return true;
}

// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(field);
    return true;
  } 
    setValid(field);
    return false;
}

function isEmpty(value) {
  return value === '';
}

function controlling(username,password)
{

}

module.exports = controlling;