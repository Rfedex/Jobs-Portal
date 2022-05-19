const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware=(err,req,res,next)=>{
    let customError={
        //setting defaults
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || `Something went wrong, please try again later`
    }
    
    //Validation Error
    if(err.name==='ValidationError'){
        customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode=400
    }

    //Duplicate Error
    if(err && err.code===11000){
        customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)} feild, please use another value`
        customError.statusCode=400
    }

    //Cast Error
    if(err.name==='CastError'){
        customError.msg=`No job with id ${err.value}`
        customError.statusCode=404
    }
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg:customError.msg})

}

module.exports=errorHandlerMiddleware