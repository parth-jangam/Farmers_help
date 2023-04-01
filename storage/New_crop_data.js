// const { text } = require('express');
const mongoose= require('mongoose')
const {Schema }=mongoose
const NotesSchema = new Schema({
    crop_name: {
        type:String,
        required:true
    },// String is shorthand for {type: String}
    email:{
        type:String,
        require:true

    }
  });
  const User=mongoose.model('newcropreq',NotesSchema)
  module.exports=User