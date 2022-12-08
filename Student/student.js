const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');


app.get('/',(req,res)=>{
    res.render('stud');
})
app.post('/form',(req,res,next)=>{
    var medid=req.body.medid;
    var medname=req.body.medname;
    var price=req.body.price;
    var medcat=req.body.medcategory;
    
        var con=mysql.createConnection({
         host:'localhost',
         user:'root',
         password:'',
         database:'main_db'
        });
        con.connect((err)=>{
         if(err) throw console.error(err);
         console.log("connected");
         var sql="INSERT INTO Medicine(medid,medname,price,medcat)VALUES('"+medid+"','"+medname+"','"+price+"','"+medcat+"')";
         con.query(sql,(err)=>{
             //if(err) throw console.error(err);
             //console.log("data inserted")
             res.send("data inserted");
         }) 
     });
