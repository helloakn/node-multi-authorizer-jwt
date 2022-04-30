const {StatusCodes} = require('API/config');
module.exports = {
    "name":"defaultservice",
    "prefix":"",
    "functionList":[
        {
            /* heal/check page */
            "method": "get",
            "endPoint" : "health/check",
            "function":(res,req,next)=>{
                return {
                    statusCode: StatusCodes.Ok,
                    body:{"message":"health check is ok"}
                }
            },
            "authorization" : null
        },
        {
            /* 404 page */
            "method": "get",
            "endPoint" : "*",
            "function":(res,req,next)=>{
                return {
                    statusCode: StatusCodes.NotFound,
                    body:{"message":"Request URL not found"}
                }
            },
            "authorization" : null
        }
    ]

}