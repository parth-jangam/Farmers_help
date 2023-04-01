const mongoose=require('mongoose')
const {Schema }=mongoose
const NotesSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    notes: {
        type:String,
        required:true
    }// String is shorthand for {type: String}
  });
  const User=mongoose.model('notes',NotesSchema)
  module.exports=User