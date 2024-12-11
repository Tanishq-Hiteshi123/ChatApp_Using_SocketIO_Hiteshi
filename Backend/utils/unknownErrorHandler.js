const unknownErrorHandler = (res , message) =>{
    
    return res.status(500).json({
         success : false,
         message : message
    })
    

}

module.exports = unknownErrorHandler