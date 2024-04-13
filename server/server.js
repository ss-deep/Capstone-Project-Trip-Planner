const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { default: axios } = require('axios')
const { API_KEY, SERVER_PORT } = process.env

app.use(express.json())
app.use(cors())


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// })
app.use(express.static(`${__dirname}/public`))


app.listen(SERVER_PORT,()=>console.log(`up on ${SERVER_PORT}`))