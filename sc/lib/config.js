require('dotenv').config();
module.exports = { 
    DatabaseConfig:{
        'filePath' : './data/codetest.sqlite3'
    },
    ServerConfig:{
        PORT:process.env.PORT || 9999,
        allowFrom:process.env.allowFrom || "*"
    },
    JKey:{
        admin:"UIjHT^&*tyUHT^&*IKHUIHT&*UJHT^&3UJTYUIjHT^&*IKHU7IHyhT&*UJHT4^&UJTYUIjHT^&*tyUIKGT&",
        user:"UyUT&*UJ6IjHT^&*tUIHHcT^&UJTYUIjHT^3&*IKHU5I8HyhT&*3UJcHT^&UJTYUIjHT^&*5tyUIKGT&",
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