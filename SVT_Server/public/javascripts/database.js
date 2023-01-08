let mysql=require('mysql')

let connection = mysql.createConnection({
  host:"localhost",
  user: "root",
  password:"",
  database:"svt"
});


connection.connect((err)=>{
    if(err) console.log("Database connection error :"+err);
    console.log("Database connected!");
   
  })


  module.exports = connection;




  /**
    let username = "Atheros";
    query = `SELECT * FROM users`;
    connection.query(query,(error,data)=>{
      console.log(data);
    });
  
   */