const { urlencoded } = require('express')
const express = require('express')
const router = express.Router()
const path=require('path')
const User= require('./storage/Data')
const User1= require('./storage/logindata')
const User2= require('./storage/New_crop_data')
var bcrypt = require('bcrypt');
const alert= require('alert')
const check= false;
// const user= null;
// import validator from 'validator';
const { body, validationResult } = require('express-validator');
// router.set('view engine','hbs')
router.use(express.static('./static'))
router.use(express.urlencoded({extended:false}))
router.get("/",(req,res)=>{
    // console.log(user);
    console.log(req.body);
    // res.sendFile(path.resolve(__dirname,'./Home.html'))
    res.render('Homeuser.hbs')
})
router.get('/contactus',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./contactus.html'))
    res.render('contactus')
})

router.post('/contactus/submit',[body('email','enter valid email').isEmail(),
body('firstname','length of firstname should be 5').isLength({min:3}),
body('lastname','length of lastname should be 5').isLength({min:3})
],async(req,res)=>{
    const errors =await  validationResult(req);
    if (!errors.isEmpty()) {
      if(body('firstname').length<5){
        alert('length of firstname should be 5');
      }
      else{
        if(body('lastname').length<5){
            alert('length of lastname should be 5');
        }
        else{
            if(body('email').isEmail){
                alert('enter valid email')
            }
            else{
                return res.status(400).json({ errors: errors.array() });
            }
        }
     }
      
    }
    // let user
    
        user=await User.findOne({email:req.body.email})
    
    if(user){
       return res.status(404).json({error:"Hello you already reached us we will contact you soon"})
    }

    // const user= User(req.body)
    // user.save()
     user=await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        contact:req.body.contact_no
    })

    // res.sendFile(path.resolve(__dirname,'./contactus.html'))
    
    res.render('success',{RESPONCE:"Your contact detailes are received we will contact you soon on either email or phone"});
    // console.log(req.body);
})
router.get('/cropinfo',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./crop info.html'))
    res.render('crop info')
})
router.get('/cropinfo/click_me',(req,res)=>{
    res.render('new_crop')
})
router.post('/cropinfo/click_me/submit',async(req,res)=>{
    user= await User2.create({crop_name:req.body.new_crop,
        email:req.body.email
    })
    // res.send(req.body)
    res.render('Reply_to_user',{response:"Your email is recorded our team will contact you with your crop details soon"})
})
router.get('/discussion',(req,res)=>{
    res.render('discuss')
})
router.get('/learning',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./learning.html'))
    res.render('learning')
})
router.get('/learning/tillage',(req,res)=>{
    res.render('tillage')
})
router.get('/learning/sowing',(req,res)=>{
    res.render('sowing')
})
router.get('/learning/manuring',(req,res)=>{
    res.render('manuring')
})
router.get('/learning/irrigation',(req,res)=>{
    res.render('irrigation')
})
router.get('/learning/harvesting',(req,res)=>{
    res.render('harvesting')
})
router.get('/learning/crop_protection',(req,res)=>{
    res.render('crop_protection')
})
router.get('/learning/intercroping',(req,res)=>{
    res.render('intercroping')
})
router.get('/learning/storage',(req,res)=>{
    res.render('storage')
})
router.get('/cropinfo/chana',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./chana.html'))
    res.render('chana')
})
router.get('/cropinfo/wheat',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./wheat.html'))
    res.render('wheat')
})
router.get('/cropinfo/gehu/english',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./wheat english.html'))
    res.render('wheat english')
})
router.get('/cropinfo/bajra',(req,res)=>{
    res.render('bajra')
})
// router.get('/cropinfo/chana',(req,res)=>{
//     res.render('chana')
// })
router.get('/login',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./login.html'))
    res.render('login')
})
router.post('/login/user',[
    body('Email','enter valid email').isEmail(),
    body('password','enter valid password').isLength({min:5})
],async(req,res)=>{
    const errors =await validationResult(req);
    if (!errors.isEmpty()) {
        res.send({error:"wrong email or password, Enter correct one" })
    }
    try{
        const {Email,password}=req.body
        user=await User1.findOne({Email})
        const comppass=await bcrypt.compare(password,user.password)
        // if(!user){
        //     return res.send("invalid credentials or account with this credintial not exist")
        // }
        if(!comppass || !user){
            return res.send("invalid credentials or account with this credintial not exist")
        }
    
    // res.sendFile(path.resolve(__dirname,'./Homeuser.html'))
        // check=true;
        else{
            return  res.render('Home',{
                Login: user.name,
                Crop_Info:"Crop Info",
                Photos: "photos",
                Learn_processing:"Learn processing",
                Review:"Review"
            })
        }
    
    
    }catch(error){
        console.error(error.message)
        return res.status(500).send("internal server error")
    }


})
router.get('/signup',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'./signup.html'))
    res.render('signup')
})
router.post('/signup/newuser',[
    body('name','enter valid name').isLength({min:3}),
    body('sirname','enter valid sirname').isLength({min:3}),
    body('Email','enter valid name').isEmail(),
    body('password','enter valid password').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({error:"error"})
    }
    const {Email}=req.body
    const user=await User1.findOne({Email})
    if(user){
        return res.send("user with this email already exist")
    }
    const salt = await bcrypt.genSaltSync(10);
    const secpass=await bcrypt.hash(req.body.password,salt); 
    const user1= await User1.create({
        name:req.body.name,
        sirname: req.body.sirname,
        Email: req.body.Email,
        password:secpass
    })
    res.send("User created successfully go and login with credentials")
})


module.exports=router