require('dotenv').config()
require('express-async-errors')

const express=require('express');
const app=express()

//error handlers
const errorHandlerMiddleware=require('./middleware/error-handler')
const notFoundMiddleware=require('./middleware/not-found')

app.use(express.json());

//routes
app.get('/',(req,res)=>{
    res.send("Jobs API");
})

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port=process.env.PORT || 3000

const start= async ()=>{
    try {
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();