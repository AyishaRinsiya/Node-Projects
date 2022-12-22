const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');

    app.get("/view",(req,res)=>{
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
        var sl="SELECT * FROM student ";
        con.query(sl,(err,result,feild)=>{
          res.render('view',{'data':result})
        })
    })

    app.get('/delete/:studid',(req,res,next)=>{
        var con=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'main_db'
    });
    var idn=req.params.studid;
    console.log(idn)
    con.connect((err)=>{
        if(err) throw console.error(err);
        console.log("connected");
    });
    var sql="DELETE FROM student WHERE studid='"+idn+"'";
    con.query(sql,(err,result)=>{
        if(err)throw err;
        console.log("data Deleted");
        res.redirect('/view')
    })
})
        app.listen(9000,()=>{
            console.log('server running http://localhost:9000/');
        });