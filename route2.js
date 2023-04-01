const { urlencoded } = require('express')
const express = require('express')
const Notes= require('./storage/Notes')
const router = express.Router()
const path=require('path')

router.use(express.static('./static'))
// router.set('view engine','hbs');

router.use(express.urlencoded({extended:false}))

router.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./review.html'))
    Notes.find({},function(err, user){
        if(err){
            console.log(err)
        }
        // console.log(user)
        res.render('review',{Review:user.notes})
    })
    
})
router.post('/submit',async(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./review.html'))
    user=await Notes.create({
        name:req.body.user_name,
        email:req.body.email,
        notes:req.body.notes
    })
   
    res.render('success',{RESPONCE:"YOUR RESPONCE RECEIVED SUCCESSFULLY!!"})
    
})
module.exports=router