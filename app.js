require("dotenv").config();
const express = require("express");
const Session = require("express-session");
const redis= require("redis");
const app = express();
const createClient = redis.createClient();
const RedisStore = require("connect-redis").default;
const connectredis = require("./db/redis");
const connectMongo = require("./db/mongo");

const session = Session({
    name:"Authentication_system",
    store: new RedisStore({client:createClient}),
    resave:false,
    saveUninitialized:true,
    secret:"mysecret",
    cookie:{
        httpOnly:true,
        secure:false, 
        maxAge:60*1000
    }
})

app.use(session);
app.use(express.json());

app.use("/api/user",require("./router/user"));
app.use("/api/collegedata",require("./router/college"));

app.use((err,req,res,next)=>{
    return res.status(err.status||400).json({message:err.message});
})
connectredis(createClient);
connectMongo();
app.get("/",(req,res)=>res.send("server started"));

app.listen(3000,()=>console.log("server started"));
