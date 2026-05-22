require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const cors = require("cors")
const app=express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const database = client.db("docAppoint");
const doctorsCollection = database.collection("doctors");

app.get('/', (req,res)=>{
    res.send("server is running properly.");
})
app.get('/doctors', async (req, res) => {
    const result = await doctorsCollection.find().toArray();
    res.send(result);
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})