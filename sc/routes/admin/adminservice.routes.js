
const AdminMiddleware = require('API/middlewares/admin');
module.exports = {
    "name":"admin",
    "prefix":"admin",
    "functionList":[
        {
            "method" : 'post',
            "endPoint" : "sign-up",
            "function":"admin.signup",
            "authorizer" : null,
        },
        {
            "method" : 'post',
            "endPoint" : "sign-in",
            "function":"admin.signin",
            "authorizer" : null,
        },
        {
            "method" : 'get',
            "endPoint" : "helloworld",
            "function":"admin.helloworld",
            "authorizer" : AdminMiddleware,
        }
    ]

}