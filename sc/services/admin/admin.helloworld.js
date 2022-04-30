// program base on aws lambda function style
"use strict";

const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');

const AdminModel = require('API/models/admin');

exports.handler = async (event,callback) => {

        let acc = event.adminAccount;
        //console.log('acc',acc)
        let msg = `Hello ${acc.name}. How are you?`;
        return {
            statusCode:StatusCodes.Ok,
            body: {"message":msg}
        };
    
}