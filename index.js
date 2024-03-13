const express = require('express');
const app = express();

const path = require('path');
// const mongoose = require('mongoose');





app.set('views' , './views');
app.set('view engine','ejs');

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));


app.use('',(req,res)=>{
    res.render('index');
});

const port = 8080;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});