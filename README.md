# Multiple Authorizer in Nodejs JWT
This is for coding test.  
Multiple Authorization in Nodejs JWT

[![NodeJs](https://img.shields.io/badge/nodejs-v16.14.2-green)](https://github.com/helloakn/nodejs-express-business-days-calculator) 
[![Express](https://img.shields.io/badge/express-v^4.17.3-green)](https://github.com/helloakn/nodejs-express-business-days-calculator) 

## Table of Contents
- File Structure
- Installation
- Run
- Test

### File Structure
```nth
.
├── application                 # nodejs source code
│   └── functions               # for the common functions
│   ├── lib                     # just for system configuration files
│   ├── routes                  # urls and prefixs
│   └── services                # Controllers , we can deploy them to AWS Lambda functions
│   └── tests                   # unit test and api test
├── documentations              # for documentations resources
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