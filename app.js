//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const { json } = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express()
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/browse',(req,res)=>{
  console.log(req.body);
  if(req.body.url && req.body.url!=""){
  fetch(req.body.url)
  .then(data=>data.text())
  .then(data=>{
    res.send(data)
  }) 
}
})

app.post('/download',(req,res)=>{
  console.log(req.body);
  if(req.body.url && req.body.url!=""){
    fetch(req.body.url)
    .then(data=>data.blob())
    .then(blob=>{
      res.send(blob)
    }) 
  }
})



PORT = process.env.PORT||3000
app.listen(PORT,function(){
  console.log('server started on port '+PORT);
})
