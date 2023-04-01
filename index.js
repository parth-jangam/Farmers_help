const express= require('express')

const { dirname } = require('path')
const app= express()
const connectTomongo=require('./db')
app.set('view engine','hbs')
const path=require('path')
const routes= require('./routes')
const route2=require('./route2')
// const route3= require('./route3')
// const route3=require('./route3')
connectTomongo();
// db.collection.createIndex( <key index type specification/>, { unique: true } )
app.use('/static',express.static('static'))
// app.use(express.json())
app.use('/',routes)
app.use('/review',route2)
// app.use('/learning',route3)
// app.use('/',route3)

app.listen(5000, ()=>{
    console.log("server is listning");
})