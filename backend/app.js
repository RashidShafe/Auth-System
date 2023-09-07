const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const User = require('./models/user');

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

// const checkingUser = async (email, password) =>{
//     const user = await User.findOne({email: email});
//     const result = await user.comparePassword(password);
//     console.log(result);
// };

// checkingUser('vai@mail.com', '545425678');

app.listen(8000, ()=>{
    console.log("backend initialized");
});