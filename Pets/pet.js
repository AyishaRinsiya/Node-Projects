const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');
app.get('/',(req,res)=>{
    res.render('pet');
})

app.get('/register',(req,res)=>{
    res.render('reg');
})
app.get('/login',(req,res)=>{
    res.render('log');
})
app.post('/regis',(req,res,next)=>{
    
    var pethol=req.body.pethol;
    var petname=req.body.petname;
    var cat=req.body.cat;
    
        var con=mysql.createConnection({
         host:'localhost',
         user:'root',
         password:'',
         database:'main_db'
        });
        con.connect((err)=>{
         if(err) throw console.error(err);
         console.log("connected");
         var sql="INSERT INTO pets(pethol,petname,cat)VALUES('"+pethol+"','"+petname+"','"+cat+"')";
         con.query(sql,(err)=>{
             //if(err) throw console.error(err);
             //console.log("data inserted")
             res.send("data inserted");
         }) 
     })
    })
    app.post('/log',(req,res,next)=>{
        if(req.body.username==undefined || req.body.password==undefined ){
           res.status(500).send({error:"authentication failed"})  ;
        }
        let username=req.body.username;
        let password=req.body.password;
        let qr ="select display_name from users where username='"+username+"',password='"+password+"'";
        var con=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'main_db'
           });
        con.query(qr,(err,result)=>{
          if(err || result.length==0) {
            res.status(500).send({error:"login failed"});
          }
          else{
            res.status(200).send({success:"login success"})
          }
        })
    })


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
                var sl="SELECT * FROM pets";
                con.query(sl,(err,result,feild)=>{
                  res.render('viewdata',{'data':result})
                })
            })
            app.get('/delete/:pethol',(req,res,next)=>{
                var con=mysql.createConnection({
                    host:'localhost',
                    user:'root',
                    password:'',
                    database:'main_db'
            });
            var pethol=req.params.pethol;
            console.log(pethol)
            con.connect((err)=>{
                if(err) throw console.error(err);
                console.log("connected");
            });
            var sql="DELETE FROM pets WHERE pethol='"+pethol+"'";
            con.query(sql,(err,result)=>{
                if(err)throw err;
                console.log("data Deleted");
                res.redirect('/viewdata')
            })
        })
        app.get('/edit/:pethol',(req,res,next)=>{
            var con=mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'main_db'
        });
        con.connect((err)=>{
            if(err) throw err;
            console.log("connected");
        });
        var sl="SELECT * FROM petname WHERE id='"+id+"'";
        con.query(sl,(err,result,field)=>{
            if(err) throw err;
            res.render('edit',{'data':result})
        })
    })
        app.post('/update',(req,res,next)=>{
           
            var pethol=req.body.pethol;
            var petname=req.body.petname;
            var cat=req.body.cat;
            var con=mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'main_db'
            });
            con.connect((err)=>{
                if(err) throw err;
                console.log("connected")
            });
            var sql="UPDATE log SET  pethol='"+pethol+"',petname='"+petname+"',cat='"+cat+"',WHERE petid='"+petid+"'";
            if(err) throw err;
            res.redirect('/viewdata')
        
        })


     app.listen(9000,()=>{
        console.log('server running http://localhost:9000/');
    });
