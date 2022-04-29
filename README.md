# Multiple Authorizer in Nodejs JWT
This is for coding test.  
Multiple Authorization in Nodejs JWT

[![NodeJs](https://img.shields.io/badge/nodejs-v16.14.2-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![NPM](https://img.shields.io/badge/npm-v8.5.0-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![Express](https://img.shields.io/badge/express-v^4.17.3-green)](https://github.com/helloakn/node-multi-authorizer-jwt) 
[![Language](https://img.shields.io/badge/dynamic/json?color=blueviolet&label=Language&query=language&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fhelloakn%2Fapi-authorization-nodejs-mysql)](https://github.com/helloakn/api-authorization-nodejs-mysql)


## Table of Contents
- File Structure
- Installation
- Run
- Test

### File Structure
```nth
.
├── sc                          # nodejs source code
│   └── common                  # for the common functions
│   ├── lib                     # just for system configuration files
│   ├── routes                  # urls and prefixs
│   └── services                # Controllers , we can deploy them to AWS Lambda functions
├── tests                       # unit test and api test
├── resources                   # for documentations resources
├── README.md              
└── ...
```
### Installation
```shell
cd application
npm install
cd ../
```
## Run
```shell
cd application
npm run dev
cd ../
```
## Test
```shell
cd application
npm test
cd ../
```
![alt text](documentations/unit.test.ss.png)