// Basic lib 
const express = require('express')
const router = require('./src/routes/api')
const app = new express()
const bodyParser = require('body-parser')
const path = require('path');
const  dotenv = require("dotenv")
dotenv.config()


// Security Middleware lib import
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')
const cors = require('cors')


// Database 
const mongoose = require('mongoose')

// security middleware implement 
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use('/src/uploads',express.static(path.join(__dirname,'/src/uploads')))
// app.use(express.urlencoded({ limit: "50mb" }));


// Body parser
app.use(bodyParser.json())

// request rate limit 
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// Mongodb database connection 
const uri = "mongodb+srv://<username>:<password>@cluster0.dejzn.mongodb.net/Bakiz?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/Bakiz";
const option = { user: "monib", pass: "monib0987", autoIndex: true }
mongoose.connect(uri,option,(err) => {
    console.log("Connection Success");
    console.log(err);
})


// Routing 
app.use('/api/v1', router)



// undefined route
app.use("*", (req, res) => {
    res.status(404).json({ status: "fail", data: "Not found" })
})


module.exports = app;