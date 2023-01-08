let mysql=require('mysql')

let connection = mysql.createConnection({
  host:"localhost",
  user: "root",
  password:"",
  database:"svt"
});






const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {

      let formData = new FormData(form);
      let username = formData.get('username');
      let password = formData.get('password');
      // connect and pull database data

      connection.connect((err)=>{
        if(err) console.log("Database connection error :"+err);
        console.log("Database connected!");

        // select database 
        let query = "SELECT * FROM users WHERE username = ? AND password = ?"
        connection.query(query,[username, password],(err,result)=>{
          if(err) console.log("Database connection error at query :"+err);
          console.log("Result :" + result);
          alert("Result :" + result);
        });



      })
    });