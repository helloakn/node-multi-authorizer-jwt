
const {StatusCodes} = require('API/config');

module.exports =  (_app,_serviceList) => {
   
    middleware =(_authorizer,_serviceName,_functionName)=>{
        return async(req, res, next)=> {
             
             if(_authorizer==undefined){
                 req.serviceName = _serviceName;
                 req.functionName = _functionName;
                 return next();
             }
             else{
                let status = await _authorizer();
                if(status.isAuth()){
                    req.token = status.token;
                    res.status(response.statusCode||StatusCodes.ok).send(response.body||{});
                }
                else{
                    res.status(StatusCodes.UnAuthorize).send({});
                }
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
        res.set(response.headers||{
            "Content-Type": "application/json",
            "X-Powered-By": "sat su tal nor"
        });

        return res.status(response.statusCode||StatusCodes.ok).send(response.body||{});
    }

    generate = (_app,_serviceList) => {
        _serviceList.forEach(route=>{
            
            let service = route.service;
            service.functionList.forEach(fun=>{
                let routePrefix = `/${route.prefix?route.prefix+"/":""}${service.name}`;
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
                            router.route("/"+fun.endPoint).post(
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