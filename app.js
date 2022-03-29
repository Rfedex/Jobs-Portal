require('dotenv').config()
require('express-async-errors')


const express=require('express');
const app=express()

const connectDB=require('./db/connect')

const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')

//error handlers
const errorHandlerMiddleware=require('./middleware/error-handler')
const notFoundMiddleware=require('./middleware/not-found')

app.use(express.json());

//routes
app.use('/api/v1/auth/',authRouter)
app.use('/api/v1/jobs/',jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port=process.env.PORT || 3000

const start= async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();