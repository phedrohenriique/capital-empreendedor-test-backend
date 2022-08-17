const express = require('express');
//const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const router = require('./router')

//const indexRouter = require('./routes/index');

const app = express();

//app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(8800, ()=>{
    console.log("server is running on port 8800")
})

module.exports = app;
