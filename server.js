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

app.use('/auth' , require('./Routers/AuthRoute'))
app.use('/company' , require('./Routers/CompanyRoute'))
app.use('/notification' , require('./Routers/NotificationRoute'))
app.use('/follow' , require('./Routers/FollowRoute'))
app.use('/favorite' , require('./Routers/FavoriteRoute'))
app.use('/job' , require('./Routers/JobOffersRoute'))
app.use('application' , require('./Routers/ApplicationRoute'))
