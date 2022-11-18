const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');

function dataBase(){
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
        res.render('main'); 
    })
    app.get('/catregis',(req,res)=>{
        res.render('catreg'); 
    })

    app.post('/regis',(req,res,next)=>{  //form action
        var catid=req.body.catid;
        var catname=req.body.catname;
        var con=dataBase("main_db")
        var sql="INSERT INTO medcat (catid,catname) VALUES('"+catid+"','"+catname+"')";
       con.query(sql,(err,result)=>{
        if(err) throw err;
       })
    });
    app.get("/viewdata",(req,res)=>{
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
            var sl="SELECT * FROM medcat";
            con.query(sl,(err,result,feild)=>{
              res.render('viewdata',{'data':result})       //'data' this same name should be given in for loop ( for(var i=0;i<data.length;i++))
                                                         //length refers to no. of rows 
            })
        })
    
        app.get("/medreg",(req,res)=>{  
        //res.render('medreg');
    })    
    app.post('/mreg',(req,res,next)=>{  //form action
        var medname=req.body.medname;
        var catname=req.body.catname;
        var price=req.body.price;
        var qty=req.body.qty;
        var con=dataBase("main_db")
        var sql="INSERT INTO medetails (medname,catid,price,qty) VALUES('"+medname+"','"+catname+"','"+price+"','"+qty+"')";
       con.query(sql,(err,result)=>{
        if(err) throw err;
       })
    });
    app.get('/regmed',(req,res)=>{
        var con=dataBase()
        var sl="SELECT * FROM medcat";
        con.query(sl,(err,result,feild)=>{
           // if(result>0){
          res.render('medreg',{'data':result})
       // }
       // else{
        //    res.send("hello")
       // }
        })  
    })
    app.listen(9000,()=>{
        console.log('server running http://localhost:9000/');
    })