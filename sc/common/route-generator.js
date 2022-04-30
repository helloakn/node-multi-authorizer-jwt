
const {StatusCodes} = require('API/config');

module.exports =  (_app,_serviceList) => {
   
    middleware =(_authorizer,_serviceName,_functionName)=>{
        return async(req, res, next)=> {
            req.serviceName = _serviceName;
            req.functionName = _functionName;
             if(_authorizer==undefined){
                 
                 return next();
             }
             else{

                return await _authorizer(req,res,next);
             }
             
         }
    }
    handler = async(req,res)=>{
        let response;
        if(typeof(req.functionName) === 'function'){
            response = await req.functionName();
        }
        else{
            const serviePath = "../services/"+req.serviceName+"/"+req.functionName + ".js";
        
            const controller = require(serviePath);
            response = await controller.handler(req);
            
        }
       // console.log('console',response)
        res.set(response.headers||{
            "Content-Type": "application/json",
            "X-Powered-By": "-"
        });

        return res.status(response.statusCode||StatusCodes.ok).send(response.body||{});
    }

    generate = (_app,_serviceList) => {
        _serviceList.forEach(route=>{
            
            let service = route.service;
            service.functionList.forEach(fun=>{
                let routePrefix = `/${route.prefix?route.prefix+"/":""}${service.prefix}`;
                _app.prefix(routePrefix, function (router) {
                    //console.log(routePrefix+"/"+fun.endPoint)
                    switch(fun.method){
                        case 'post':
                            router.route("/"+fun.endPoint).post(
                                middleware(fun.authorizer,service.name,fun.function),
                                handler
                            );
                            break;
                        case 'get':
                            //console.log('service name',service.name+'/'fun.function)
                            router.route("/"+fun.endPoint).get(
                                middleware(fun.authorizer,service.name,fun.function),
                                handler
                            );
                            break;
                    }
                    
                });
            });

        });
    }
  
    generate(_app,_serviceList);

  };