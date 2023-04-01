const mongoose= require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    }, // String is shorthand for {type: String}
    sirname: {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }   
   
  });
 const User=mongoose.model('logindata',UserSchema)
 module.exports=User