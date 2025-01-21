// 1. import ditenv
// loads .env file contents into process .env by  defaults
require('dotenv').config()

//2.import express
const express = require('express')

//3.import cors
const cors = require('cors')

//import router
const router = require('./Routers/router')

//import connection.js file
require('./DB/connection')

//import application specific middleware

//4.create server
//Creates an Express application. The express() function is a top-level function exported by the express module.
const elderly = express()

//5.use of cors in server
elderly.use(cors())

//6.Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
elderly.use(express.json())

//use router
elderly.use(router)


//7.custamize the port - by default -3000
const PORT = 5000 || process.env

//8.to run server
elderly.listen(PORT,()=>{
    console.log(`SERVER RUNNING SCUCESSFULLY AT PORT NUMBER ${PORT}`);
})
elderly.get('/',(req,res)=>{
    res.send(`<h1 style="color:green">Elderly server reunning successfully and ready to accept request from client</h1>`)
})

/* //post request
pfServer.post('/',(req,res)=>{
    res.send(`post request`)
})

//put request
pfServer.put('/',(req,res)=>{
    res.send(`put request`)
}) */