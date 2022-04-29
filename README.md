# Multiple Authorizer in Nodejs JWT
This is for coding test.  
Multiple Authorization in Nodejs JWT

[![NodeJs](https://img.shields.io/badge/nodejs-v16.14.2-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![NPM](https://img.shields.io/badge/npm-v8.5.0-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![Express](https://img.shields.io/badge/express-v^4.17.3-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![Language](https://img.shields.io/badge/dynamic/json?color=blueviolet&label=Language&query=language&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fhelloakn%2Fapi-authorization-nodejs-mysql)](https://github.com/helloakn/api-authorization-nodejs-mysql)


## Table of Contents
- File Structure
- Npm Dependences
- Installation
- Run
- Test

### File Structure
Structure is base on lambda functions.  
So we can easily deploy to lambda or ECS or EC2 as the monolith or microservice.  
We can separate authorizer and functions too.  
All the services on our code would be functions in Lambda and middleware will be lambda Authorizer as well as all the others are the layers.
```nth
.
├── sc                          # nodejs source code
│   └── common                  # for the common functions
│   ├── lib                     # just for system configuration files
│   ├── routes                  # urls and prefixs
│   │   └── ...
│   └── services                # Controllers , we can deploy them to AWS Lambda functions
│       ├── admin               # For all admin functions
│       │   └── ...
│       └── user                # For all user functions
│           └── ...
├── tests                       # unit test and api test
├── resources                   # for documentations resources
├── README.md              
└── ...
```
### Npm Dependences

* [cors](https://www.npmjs.com/package/cors)         : ^2.8.5 - for api cors allown and deny
* [dotenv](https://www.npmjs.com/package/dotenv)       : ^16.0.0 - to load environment variable from .env file or sys environment variable
* [express](https://www.npmjs.com/package/express)      : ^4.18.1 - for web app
* [sqlite3](https://www.npmjs.com/package/sqlite3) : 5.0.6 - to use as local storage  

### Installation
We have to install npm dependence to run our program smoothly. pls follow as the singlie line of  the following command.
```shell
npm install
```
## Run
Configuration is just for dev(local) only. we can easily execute our program in local as the following command.
```shell
npm run dev
```
## Test
I use jest and supertest npm package for testing. main program is base on commajs and jest is base on model type. however we can run and test our program because i have configured in package.json. You can check the testing source code in [./test](./test) directory too. 
Here is the command to run the testing.
```shell
npm test
```
![alt text](resources/unit.test.ss.png)