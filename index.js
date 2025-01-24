// importing required modules
const express = require('express');
const { request } = require('http');
const path =require('path')
const qrcode= require('qrcode')

//Express application setup
const app = express();

//View Engine Configuration
//view engine: Sets EJS as the template engine to render dynamic HTML.
//views: Specifies the folder where the EJS files are located. 

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

//middleware setup
//express.json(): Parses JSON payloads from incoming requests.
// express.urlencoded({ extended: true })means it convert the data into url which is submitted through form tag
// express.static('public') means it serves static files from public directory

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(request,response)=>{
    response.render('index') 
    
})
// why we use response.render(filename) instead of using response.sendFile(filename) because
// the file index.ejs contains dynamic placeholdersso we use render
//whenever the file extension has .html it means that file is a static file so we use sendFile(filename)


// app.post means we will get information from browser using form
app.post('/qrcodedata',(req,res)=>{
    console.log(req.body.inputtag);
    let mydata=req.body.inputtag
    qrcode.toDataURL(mydata,(err,value)=>{
        console.log(value);
        res.render('thankyou',{"converturl":value})
        
    })
})

app.listen(10000,()=>{
    console.log("the server is running");
    
})