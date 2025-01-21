//1) logic to resolve the request

//import model
const users = require('../Model/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//register request
exports.register = async(req,res)=>{
  console.log(req.body);

   //extract data from request body  - json format is converted into javascript object by json() sos that we can directly destructure the keys from the req body
   const {username,email,password} = req.body
    
 try{
   const existUser  = await users.findOne({email})
 console.log(existUser);
  if(existUser){
    res.status(406).json('Account already exist.... please login')
  }
  else{
    //need to register
          //1)create a object for the model
          const newUser = new users({
            username,
            email,
            password
          })

          //add to mongodb - use save method in mongoose
          await newUser.save()
    //response
    res.status(200).json(newUser)
  } 
  }
  catch(err){
    res.status(401).json(`Register request failed due to  ${err}`)
  }   
}

//login request

exports.login = async(req,res)=>{
  console.log(req.body)
  const {email,password} = req.body

  try{const existingUser = await users.findOne({email,password})
  console.log(existingUser);

  if(existingUser){
    //jwt token
   const token = jwt.sign({userId:existingUser._id},"secrectkey1010")
    //sending as object because we are sending more than one data
    res.status(200).json({
        existingUser,
        token
      })
  }
  else{
    res.status(404).json('Invalid email or password')
  }}catch(err){
    res.status(401).json(`login request failed due to :${err}`)
  }
}


