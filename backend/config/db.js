const mongoose = require('mongoose');


const connectDb = async()=>{
    try {
       
        const connect = await mongoose.connect(process.env.CONNECTION,);
        console.log(" Database connected: " , connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1); 
    }
}

module.exports  = connectDb;