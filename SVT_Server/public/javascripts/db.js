import mysql from './bundle.js';

let connection = mysql.createConnection({
  host:"localhost",
  user: "root",
  password:"",
  database:"svt"

});


connection.connect((err)=>{
    if(err) console.log("Database connection error :"+err);
    else console.log("Database connected!");
  })
  


  export default connection;




  /**
    let username = "Atheros";
    query = `SELECT * FROM users`;
    connection.query(query,(error,data)=>{
      console.log(data);
    });
  
   */