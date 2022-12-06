const express= require('express')
const app=express()
app.use(express.urlencoded())
app.set('view engine','ejs')
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('add',{'result':""});
})

app.post('/addpost',(req,res,next)=>{
    var num1=req.body.fnum;
    var num2=req.body.lnum;
    var c=parseFloat(num1)+parseFloat(num2);
    res.render('add',{'result':c})
})
app.get('/circle',(req,res,next)=>{
    res.render('circle',{'result':""});
})
app.post('/area',(req,res,next)=>{
    var r=req.body.num;
    var c=3.14 * r * r;
    console.log(c);
    res.render('circle',{'result':c})
})
app.listen(9000,()=>{
    console.log("Server running http://localhost:9000/")
})
