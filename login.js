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
    res.render('registration'); 
})
app.get('/register',(req,res)=>{    //name anything
    res.render('reg');              //give name of html file      
})
app.post('/regis',(req,res,next)=>{  //form action
    var username=req.body.username;
    var password=req.body.password;
    var phone=req.body.phone;
    var con=dataBase("main_db")
    var sql="INSERT INTO user (username,password,phone) VALUES('"+username+"','"+password+"','"+phone+"')";
   con.query(sql,(err,result)=>{
    if(err) throw err;
    res.render('log',{'msg':"registration successful"})
   })
});

app.get('/login',(req,res)=>{``
    res.render('log',{'msg':""});
});
app.post('/log',(req,res,next)=>{  //form action
    var username=req.body.username;
    var password=req.body.password;
    var con=dataBase("main_db")
    var sql="select * from user where username='"+username+"'AND password='"+password+"'";
    var x=con.query(sql,(err,result,failed)=>{
        if(err) throw err;
        if(result.length>0){
            res.render("main")
        }
        else{
            res.render('log',{"msg":"Login Failed"})
        }
    })
});
app.listen(9000,()=>{
    console.log('server running http://localhost:9000/');
})
