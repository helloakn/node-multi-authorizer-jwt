require('dotenv').config();
module.exports = { 
    ServerConfig:{
        PORT:process.env.PORT || 9999,
        allowFrom:process.env.allowFrom || "*"
    },
    Path:{
        services: '../'
    },
    StatusCodes:{
        Ok:200,
        Created:201,
        Accepted:202,
        NoContent:204,
        BadRequest:400,
        UnAuthorize:401,
        Forbidden:403,
        NotFound:404,
        NotAcceptable:406,
        UnSupportedMediaType:415,
        UpgradeRequired:426,
        TooManyRequests:429
    }
};