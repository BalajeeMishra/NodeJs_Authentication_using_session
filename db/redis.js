
const connectredis = async(client)=>{
    await client.connect();
    console.log("redis server connected");
    return client;
}

module.exports= connectredis;