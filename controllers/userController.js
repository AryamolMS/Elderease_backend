//1) logic to resolve the request

//import model
const users = require('../Model/userSchema')
const bcrypt = require('bcryptjs');
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

exports.login = async (req, res) => {
  console.log("🔹 Incoming Request Body:", req.body); // ✅ Debugging

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Missing Email or Password");
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser || existingUser.password !== password) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token with the correct secret
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );
    
    console.log("🔑 Signing Token With Secret:", process.env.JWT_SECRET); // Debug
    console.log("🟢 Generated Token:", token);
    

    // ✅ Send token and user details in response
    res.status(200).json({ 
      message: "Login successful", 
      userId: existingUser._id, 
      email: existingUser.email,
      token 
    });

  } catch (error) {
    console.error("❌ Error in Login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

