module.exports = app => {
    /* 500 /404 Page Handler */
    console.log('hello')
    app.use((err, req, res, next) => {
        res.set({
            "Content-Type": "application/json",
            "X-Powered-By": "-"
        });
        console.log(err)
        res.status(err.statusCode).send(err.statusCode==404?"not Found url":err.statusCode)
    });
    /* end 500 / 404  Page Handler*/

    let serviceList = [];
    
    serviceList.push(
        { 
            prefix:'api',
            service: require("./admin/adminservice.routes.js")
        },
        { 
            prefix:'api',
            service: require("./user/userservice.routes.js")
        },
        { 
            // for 404 page, 500 page, health check page
            prefix:'',
            service: require("./default.routes.js")
        }
    );

   require('API/routeGenerator')(app,serviceList);

}