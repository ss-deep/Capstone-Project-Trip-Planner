const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const {SERVER_PORT} = process.env
const path = require("path")

app.use(express.json())
app.use(cors())


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })

app.use(express.static(`${__dirname}/public`))

const { getAttractions } = require('./controller.js')

app.post('/attractions', getAttractions)

app.listen(SERVER_PORT,()=>console.log(`up on ${SERVER_PORT}`))