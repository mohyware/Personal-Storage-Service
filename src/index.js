const express = require('express')
require("dotenv").config();
const prisma = require('./db/prisma')


const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})