const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');

function dataBase(db){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'main_db'
       });
       con.connect((err)=>{
        if(err) throw console.error(err);
        console.log("connected");
       });
       return con;
    }
    app.get('/',(req,res)=>{
        res.render('medreg'); 
    })
    app.get('/',(req,res)=>{
        res.render('medreg'); 
    }) 
    app.post('/mreg',(req,res,next)=>{  //form action
        var medname=req.body.medname;
        var catname=req.body.catname;
        var price=req.body.price;
        var qty=req.body.qty;
        var con=dataBase("main_db")
        var sql="INSERT INTO medetails (medname,catname,price,qty) VALUES('"+medname+"','"+catname+"','"+price+"','"+qty+"')";
       con.query(sql,(err,result)=>{
        if(err) throw err;
       })
    });
    app.get("/view",(req,res)=>{
            con.connect((err)=>{
                if(err) throw console.error(err);
                console.log("connected");
            });
            var con=dataBase("main_db")
            var sl="SELECT * FROM medetails ";
            con.query(sl,(err,result,feild)=>{
              res.render('view',{'data':result})
            })
        })
    app.listen(9000,()=>{
        console.log('server running http://localhost:9000/');
    })