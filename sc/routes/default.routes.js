const {StatusCodes} = require('API/config');
module.exports = {
    "name":"defaultservice",
    "prefix":"",
    "functionList":[
        {
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
            "method": "get",
            "endPoint" : "page/404",
            "function":(res,req,next)=>{
                return {
                    statusCode: StatusCodes.Ok,
                    body:{"message":"Request URL not found"}
                }
            },
            "authorization" : null
        },
        {
            "method": "get",
            "endPoint" : "*",
            "function":(res,req,next)=>{
                return {
                    statusCode: StatusCodes.Ok,
                    body:{"message":"Request URL not found"}
                }
            },
            "authorization" : null
        }
    ]

}