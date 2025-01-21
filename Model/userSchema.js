//import mongoose
const mongoose = require('mongoose')

//create schema

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 characters but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        // if the input value is not a proper email id then it throw the error and return invalid email
        //isEmail is a method in validator which check wheather the input is a proper email id or not
        validator(value){
            if(!validator.isEmail(value))
                {throw new Error('invalid Email')}
            
        }
    },
    password:{
        type:String,
        require:true
    }
})

//create model
const users = mongoose.model("users",userSchema)

//export
module.exports = users