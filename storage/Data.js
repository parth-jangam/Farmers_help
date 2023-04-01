const mongoose= require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstname: {
        type:String,
        required:true
    }, // String is shorthand for {type: String}
    lastname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        require:true
    }
   
  });
 const User=mongoose.model('user',UserSchema)
 module.exports=User