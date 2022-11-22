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
    res.render('reg'); 
})

app.post('/regis',(req,res,next)=>{  //form action
    var email=req.body.email;
    var password=req.body.password;
    var name=req.body.name;
    var phone=req.body.phone;
    var age=req.body.age;
    var address=req.body.address;
    var con=dataBase("main_db")
    var sql="INSERT INTO details (email,password,name,phone,age,address) VALUES('"+email+"','"+password+"','null','null','null','null')";
     con.query(sql,(err,result)=>{
    if(err) throw err;
    res.render('login',{'msg':"registration successful"})
    
   })
});

app.get('/login',(req,res)=>{
    res.render('login',{'msg':""});
});
app.post('/log',(req,res,next)=>{  //form action
    var email=req.body.email;
    var password=req.body.password;
    var con=dataBase("main_db")
    var sql="select * from details where email='"+email+"'AND password='"+password+"'";
    var x=con.query(sql,(err,result,failed)=>{
        if(err) throw err;
        if(result.length>0){
            res.render("home",{'eml':email})
        }
        else{
            res.render('log',{"msg":"Login Failed"})
        }
    })
});
app.get('/home/n:',(req,res)=>{

    res.render('home',{'eml':n}); 
})
// app.post('/sub',(req,res,next)=>{  //form action
//     var name=req.body.name;
//     var phone=req.body.phone;
//     var age=req.body.age;
//     var address=req.body.address;
    
//     var con=dataBase("main_db")
//     var sql="INSERT INTO details (email,password,name,phone,age,address) VALUES('"+email+"','"+password+"','"+name+"','"+phone+"','"+age+"','"+address+"')";
//    con.query(sql,(err,result)=>{
//     if(err) throw err;
//     if(result.length>0){
//         res.render('home')
//     }
//     else{
//     res.render('home',{'msg':"registration completed"})
//     }
//    })
// });


app.post('/sub',(req,res,next)=>{  //form action
    var name=req.body.name;
    var phone=req.body.phone;
    var age=req.body.age;
    var address=req.body.address;
    var eml=req.body.email;
    var con=dataBase("main_db")
    var sql="UPDATE details SET  name='"+name+"',phone='"+phone+"',age='"+age+"',address'"+address+"' WHERE email='"+eml+"'";
   con.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
        res.render('home')
    }
    else{
    res.render('home',{'msg':"registration completed"})
    }
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
        var sl="SELECT * FROM details";
        con.query(sl,(err,result,feild)=>{
          res.render('viewdata',{'data':result})
        })
    })
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
    var sql="DELETE FROM details WHERE id='"+id+"'";
    con.query(sql,(err,result)=>{
        if(err)throw err;
        console.log("data Deleted");
        res.redirect('/viewdata')
    })
})
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
var sl="SELECT * FROM details WHERE id='"+id+"'";
con.query(sl,(err,result,field)=>{
    if(err) throw err;
    res.render('edit',{'data':result})
})
})
app.post('/update',(req,res,next)=>{ 
    var email=req.body.email;
    var password=req.body.password;
    var name=req.body.name;
    var phone=req.body.phone;
    var age=req.body.age;
    var address=req.body.address;
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
    var sql="UPDATE details SET  email='"+email+"',password='"+password+"',name='"+name+"',phone='"+phone+"' ,age='"+age+"',address='"+address+"'WHERE id='"+id+"'";
    con.query(sql,(err,result,field)=>{
        if(err) throw err;
        res.redirect('/viewdata')
    })
})


app.listen(8180,()=>{
    console.log('server running http://localhost:8180/');
})
