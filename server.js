
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dbConfig = require('./src/config/db.config');
const serverConfig = require('./src/config/server.config');
const pubRouter=require('./src/route/pub');
const verifyToken = require('./src/middleware/auth');
const Router = require('./src/route/api');

//Initializing express
const app = express();
//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('./uploads',express.static('./uploads'));

/**
 * DB connection 
 */
app.use(express.json());
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"));
db.once("open", () => {
    console.log("Connected to mongo DB");
  
})

app.use('/pub', pubRouter);
app.use('/', verifyToken,Router);

app.listen(serverConfig.PORT, () => {
    console.log("server started is this port number: ", serverConfig.PORT);
})