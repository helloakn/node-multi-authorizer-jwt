
const UserMiddleware = require('API/middlewares/user');
module.exports = {
    "name":"user",
    "prefix":"user",
    "functionList":[
        {
            "method" : 'post',
            "endPoint" : "sign-up",
            "function":"user.signup",
            "authorizer" : null,
        },
        {
            "method" : 'post',
            "endPoint" : "sign-in",
            "function":"user.signin",
            "authorizer" : null,
        },
        {
            "method" : 'get',
            "endPoint" : "helloworld",
            "function":"user.helloworld",
            "authorizer" : UserMiddleware,
        }
    ]

}