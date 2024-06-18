const express = require('express')
const app = express()
require('./config/database')

const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')


app.use(express.json())
app.use('/products',productRoute)
app.use('/',userRoute)
app.listen(5000,()=>{
    console.log("Server is running....");
})