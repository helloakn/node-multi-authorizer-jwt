module.exports = {
    "name":"admin",
    "prefix":"",
    "functionList":[
        {
            "method" : 'post',
            "endPoint" : "sign-up",
            "function":"signup",
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
            "function":"helloworld",
            "authorizer" : null,
        }
    ]

}