const express = require('express')
const cors = require('cors')
const app = express()
const  router  = require('./router')

app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(8800, () => console.log("server is running on port: 8800"))