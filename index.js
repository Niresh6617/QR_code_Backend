// importing required modules
const express = require('express');
const { request } = require('http');
const path =require('path')
const qrcode= require('qrcode')

//Express application setup
const app = express();
// why we use ejs in html because it allows us to embed dynamic content into HTML templates.
// or it converts the html code dynamically EJS(Embeded Javascript )

//View Engine Configuration
//view engine: Sets EJS as the template engine to render dynamic HTML.
//views: Specifies the folder where the EJS files are located. 

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

//middleware setup
//express.json(): Parses JSON payloads from incoming requests.
// parse means analyze and converting data form one formate to another which is understood by program
// express.urlencoded({ extended: true })means it convert the data into url which is submitted through form tag
// express.static('public') means it serves static files from public directory

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(request,response)=>{
    response.render('index') 
    
})
// why we use response.render(filename) instead of using response.sendFile(path.join(__dirname,'filename')) because
// the file index.ejs contains dynamic placeholders so we use render
//whenever the file extension has .html it means that file is a static file so we use sendFile(filename)
// after that go to views folder inside index.ejs file 

// app.post means we will get information from browser using form
app.post('/qrcodedata',(req,res)=>{
    console.log(req.body.inputtag);
    let mydata=req.body.inputtag
    const QRcodeImage =  path.join(__dirname,"public","qrcode.png")
    qrcode.toFile(QRcodeImage,mydata) 
    qrcode.toDataURL(mydata,(err,value)=>{
        console.log(value);
        res.render('thankyou',{"converturl":value})
        
    })
})

app.listen(10000,()=>{
    console.log("the server is running");
    
})