const express = require('express')
const path = require('path')
const rootDir = require('./util/path')
const homeRoutes = require('./routers/admin')
const usersRoutes = require('./routers/users')

const app = express()
app.use(express.static(path.join(__dirname,'public')))
app.use(homeRoutes);
app.use(usersRoutes);

app.listen(3000)