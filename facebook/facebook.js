const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var fs=require("fs");
app.get('/',(req,res)=>{
    res.render('facebook');
})
app.post('/login',(req,res,next)=>{
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var pass=req.body.password;
    var dob=req.body.dob;
    var fem=req.body.female;
    var male=req.body.male;
    data=fname+"\n"+lname+"\n"+email+"\n"+pass+"\n"+dob+"\n"+fem+"\n"+male;
    console.log("hey");
    fs.writeFile('put.txt',data,function(err){
        if(err){
            return console.error(err);
        }
        console.log("Data written successfully!");
        console.log("Let's read newly written data");
   
        fs.readFile('put.txt', function (err, data) {
           if (err) {
              return console.error(err);
           }
           console.log("Asynchronous read: " + data.toString());
        });
     });
     
    res.render('');
    res.send('!')
})
app.listen(9000,()=>{
    console.log("Server running http://localhost:9000/")
})