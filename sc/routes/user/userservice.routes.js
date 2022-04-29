module.exports = {
    "name":"admin",
    "prefix":"",
    "functionList":[
        {
            "method" : 'post',
            "endPoint" : "sign-up",
            "function":"signup",
            "authorization" : null,
        },
        {
            "method" : 'post',
            "endPoint" : "sign-in",
            "function":"signin",
            "authorization" : null,
        },
        {
            "method" : 'post',
            "endPoint" : "helloworld",
            "function":"helloworld",
            "authorization" : null,
        }
    ]

}