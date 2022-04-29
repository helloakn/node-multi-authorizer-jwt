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
            "function":"signin",
            "authorizer" : null,
        },
        {
            "method" : 'post',
            "endPoint" : "helloworld",
            "function":"admin.helloworld",
            "authorizer" : null,
        }
    ]

}