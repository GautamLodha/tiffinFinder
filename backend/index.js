const express = require('express');
const { connectDB } = require('./src/config/db');
const app = express()
require('dotenv').config();
app.use(express.json());

connectDB(process.env.MONGODB_URL);

app.get('/',(req,res)=>{
    res.send('welcome to the app');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})