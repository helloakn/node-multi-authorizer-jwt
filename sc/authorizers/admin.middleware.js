var jwt = require('jsonwebtoken');
const {StatusCodes,JKey} = require('API/config');

module.exports = AdminMiddleware =(req, res, next)=>{
    //res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var token = req.headers['x-access-token'];
    if (!token)
    return res.status(StatusCodes.Forbidden).send({ code:StatusCodes.Forbidden,status: 'failed!', error:[{"msg":'No token provided.'}]  });

    jwt.verify(token, JKey.admin, function(err, auth) {
    if (err)
    return res.status(StatusCodes.Forbidden).send({ code:StatusCodes.Forbidden,status: 'failed!', error:[{"msg":'Failed to authenticate token.'}]   });
        
    // if everything good, save to request for use in other routes
    //console.log(req.authType);
    if (auth.authType!='admin')
    return res.status(StatusCodes.Forbidden).send({ code:StatusCodes.Forbidden,status: 'failed!', error:[{"msg":'Failed to authenticate admin token.'}]   });
    
    req.authType = auth.authType;
    req.adminAccount = auth.adminAccount;
    //console.log(auth.adminAccount);
    next();

    });
}
