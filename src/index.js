require("dotenv").config();
const express = require('express')
const port = process.env.PORT;

const authRouter = require('./routes/auth-route')

const initializePassport = require('./config/passport')
var passport = require("passport");

const app = express()

initializePassport(passport)
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})