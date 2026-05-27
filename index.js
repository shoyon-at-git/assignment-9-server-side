require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const cors = require("cors");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
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

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)
const verifyToken = async(req,res,next)=>{
  const authHeader = req?.headers.authorization;
  if(!authHeader){
    return res.status(401).json({message:"Unauthorized"});
  }
  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({message:"Unauthorized"});
  }
  try {
    const {payload} =await jwtVerify(token, JWKS);
    // console.log(payload);
    next();
  } catch (error) {
    return res.status(403).json({message:"Forbidden"});
  }
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const database = client.db("docAppoint");
const doctorsCollection = database.collection("doctors");
const bookingsCollection = database.collection("bookings");
const usersCollection = database.collection("user");

app.get('/', (req,res)=>{
    res.send("server is running properly.");
})
app.get('/top-doctors', async (req, res) => {
    const result = (await doctorsCollection.find().limit(3).toArray());
    res.json(result);
});
app.get('/doctors',verifyToken, async (req, res) => {
    const result = await doctorsCollection.find().toArray();
    res.json(result);
});

app.get('/view-doctor/:id', verifyToken ,async(req,res)=>{
    const {id} = req.params;
    const matchedDoctor = await doctorsCollection.findOne({_id:new ObjectId(id)});
    res.json(matchedDoctor);
})

app.post('/add-booking',verifyToken, async(req,res)=>{
  const bookingInfo = req.body;
  const result = await bookingsCollection.insertOne(bookingInfo);
  res.send(result);
})

app.get('/appointments',verifyToken, async(req,res)=>{
   const result = await bookingsCollection.find().toArray();
   res.send(result);
})

app.get('/my-bookings',verifyToken, async(req,res)=>{
   const email = req.query.email;
   const result = await bookingsCollection.find({userEmail:email}).toArray();
   res.send(result);
})

app.delete('/delete-booking/:id',verifyToken, async(req,res)=>{
  const id = req.params.id;
  const result= await bookingsCollection.deleteOne({
    _id:new ObjectId(id)
  })
  res.send(result);
})

app.get("/bookings/:id",verifyToken, async (req, res) => {

    const id = req.params.id;

    const result = await bookingsCollection.findOne({
        _id: new ObjectId(id),
    });

    res.send(result);
});

app.patch('/edit-booking/:id',verifyToken,async(req,res)=>{
  const id = req.params.id;
  const updatedBooking = req.body;
  const result =await bookingsCollection.updateOne({_id:new ObjectId(id)}, {$set:updatedBooking});
  res.send(result);
})

// app.patch('/update-user',verifyToken,async(req,res)=>{
//   const {email,name,image} = req.body;
//   console.log("BODY:", req.body);
//   const result =
//         await usersCollection.updateOne(
//             { email },
//             {
//                 $set: {
//                     name,
//                     image,
//                 },
//             }
//         );

//     res.send(result);
// })

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})