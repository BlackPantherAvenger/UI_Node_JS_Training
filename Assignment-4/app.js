const http = require('http')
const express = require("express");
const path = require('path')
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");

const rootDir = require('./util/path')
const adminRouter = require('./routers/admin')
const usersRouter = require('./routers/users')

const app = express();

console.log("test - Assignment - 4 ");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// to use pug html
// app.set('view engine', 'pug')

// to use handlerbars html
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}))
// app.set('view engine', 'hbs')

//to use ejs html
app.set('view engine', 'ejs')

app.set('views','views')

app.use(adminRouter.routes);
app.use(usersRouter)

app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(rootDir, 'views','404.html'))
    res.render('404',{pageTitle: 'Page not Found!'})
})
// const server = http.createServer(app)
app.listen(4000);
