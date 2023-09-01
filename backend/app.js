const express = require('express');
const app=express();
// const User=require('./models/user');
const userRouter = require('./routes/user');

require('./models/db');

app.get('/', (req,res)=>{
    res.send("just Do it!");
});

//app.use a middileware function
// app.use((req,res,next)=>{
//     req.on('data', (chunk) => {
//         //console.log(JSON.parse(chunk));
//         const data = JSON.parse(chunk);
//         req.body = data
//         next();
//     })
// });

app.use(express.json());
app.use(userRouter);

app.get('/test', (req,res)=>{
    res.send("hello from test");
});

app.listen(8000, ()=>{
    console.log("backend initialized");
});