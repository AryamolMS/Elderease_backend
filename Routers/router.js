//1) import express module
const express = require('express')


    //import controller
    const userController = require('../controllers/userController')


    //import jwtmiddleware
    const jwtMiddleware = require('../middleware/jwtMiddleware')


    //import multer
    const multerConfig = require('../Middleware/multerMiddleware')

// 2)create an object for router class inside express module
const router = new express.Router()

// 3) setup path to resolve request
   //a) register
   //syntax - router.httprequest('path to resolve' ,()=>{how to resolve})
   //a)register
   router.post('/user/register',userController.register)

   //b) login
   router.post('/user/login',userController.login)

//4) export router
module.exports = router   