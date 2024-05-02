const mongoose = require("mongoose");
const dburl = process.env.dburl;
const connectMongo = async()=>{
        await mongoose.connect(dburl);
        console.log("Mongodb connected");
}

module.exports = connectMongo;