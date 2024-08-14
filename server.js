const express = require('express')
const app = express()
const connect = require('./DBConfig/ConnectDB')
app.use(express.json())

require('dotenv').config()

const PORT = process.env.PORT || 7888

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})

connect()
