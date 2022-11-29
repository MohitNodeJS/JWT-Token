import express from 'express';
const app = express();
import bodyparser from 'express'
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

import mongoose from 'mongoose';
import Route from './Router/route.js';
mongoose.connect('mongodb://localhost:27017/user').then(()=>{
    console.log('mongoose is connected')
}).catch((err)=>{
    console.log("cant connect to database",err)
})

Route(app)

app.listen(3100)