require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const cors = require("cors")
const app=express();
const port = process.env.PORT;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req,res)=>{
    res.send("server is running properly,,");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})