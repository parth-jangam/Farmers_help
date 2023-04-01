const { urlencoded } = require('express')
const express = require('express')
const router = express.Router()
const path=require('path')
// const { route } = require('./routes')
const User= require('./storage/logindata')
router.use(express.static('./static'))
router.use(express.urlencoded({extended:false}))


router.get('/',(req,res)=>{
    res.render('learning')
})

