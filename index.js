require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app=express();

const port = process.env.PORT;

app.get('/', (req,res)=>{
    res.send("server is running properly,,");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})