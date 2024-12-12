const responseHandler = (res , statusCode , message , data) =>{
    
    return res.status(statusCode).json({
         success : true,
         message : message,
         data
    })
    

}

module.exports = responseHandler    