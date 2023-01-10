import database from './db.js';


window.addEventListener('load',()=>{
    query = "SELECT * FROM messages;";
    
    
    database.query(query,(err,data)=>{
        if(err)console.log(err)
        else
        {
        console.log(data)
          let txt = `<table>`;
          for(let messages of data)
          {
            txt+=`<tr>`;
            txt+=`<td>${messages.ID}</td>`;
            txt+=`<td>${messages.name}</td>`;
            txt+=`<td>${messages.email}</td>`;
            txt+=`<td>${messages.message}</td>`;
            txt+=`<tr>`;
          }
          txt += `<table>`;
          console.log(txt)
          document.getElementById("MessageBox").innerHTML = 123123;
    
        }
    });
    
})



  
