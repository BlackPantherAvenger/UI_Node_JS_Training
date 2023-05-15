const express = require('express')
const path = require('path')
const rootDir = require('../util/path')
const routes = express.Router()

routes.get('/users',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../',"views","users.html"))
})

module.exports = routes