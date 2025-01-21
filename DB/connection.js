//import mongoose
const mongoose = require('mongoose')

//access connection string of mongodb
const connectionString = process.env.DATABASE

//connect server  with mongodb
mongoose.connect(connectionString).then((res)=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to : ${err}`);
})