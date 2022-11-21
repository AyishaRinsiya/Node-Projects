const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
var mysql=require('mysql');
app.get('/',(req,res)=>{
    res.render('pet');
})

app.get('/register',(req,res)=>{    //name anything
    res.render('reg');              //give name of html file
})
app.get('/login',(req,res)=>{
    res.render('log');
})
app.post('/regis',(req,res,next)=>{  //form action
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
    

     //view data

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

            //delete

            app.get('/delete/:id',(req,res,next)=>{
                var con=mysql.createConnection({
                    host:'localhost',
                    user:'root',
                    password:'',
                    database:'main_db'
            });
            var id=req.params.id;
            console.log(id)

            con.connect((err)=>{
                if(err) throw console.error(err);
                console.log("connected");
            });
            var sql="DELETE FROM pets WHERE id='"+id+"'";
            con.query(sql,(err,result)=>{
                if(err)throw err;
                console.log("data Deleted");
                res.redirect('/viewdata')
            })
        })

        //edit

        app.get('/edit/:id',(req,res,next)=>{
            var con=mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'main_db'
        });
        var id=req.params.id;
            console.log(id)

        con.connect((err)=>{
            if(err) throw err;
            console.log("connected");
        });
        var sl="SELECT * FROM pets WHERE id='"+id+"'";
        con.query(sl,(err,result,field)=>{
            if(err) throw err;
            res.render('edit',{'data':result})
        })
    })

    //update

        app.post('/update',(req,res,next)=>{ 
            var pethol=req.body.pethol;
            var petname=req.body.petname;
            var cat=req.body.cat;
            var id=req.body.id;

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
            var sql="UPDATE pets SET  pethol='"+pethol+"',petname='"+petname+"',cat='"+cat+"' WHERE id='"+id+"'";
            con.query(sql,(err,result,field)=>{
                if(err) throw err;
                res.redirect('/viewdata')
            })
        })

     app.listen(9000,()=>{
        console.log('server running http://localhost:9000/');
    });