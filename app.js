const express=require('express');
const bodyparser=require('body-parser')
const mongoose = require('mongoose');

const app=express();
const port= process.env.PORT || 3000;
const db=require("./setup/myurl").mongoURL;

//calling all routes
const auth=require('./routes/api/auth');
const question=require('./routes/api/question')
const profile=require('./routes/api/profile')
//connecting monogodb
mongoose.connect(db)
    .then(()=>console.log("sucess db"))
    .catch(err=>console.log(err))

//calling middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



//calling routes finally
app.use("/api/auth",auth);
app.use("/api/question",question);
app.use("/api/profile",profile);



app.listen(port,()=>console.log("suces running....."+port))