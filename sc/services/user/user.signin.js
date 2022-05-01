// program base on aws lambda function style
"use strict";
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const {StatusCodes,JKey} = require('API/config');
const Validator = require('API/functions/validator');

const tblUser = (new (require('API/models/user'))());

exports.handler = async (event,callback) => {

    const formData = event.body;
    
    const validator = await Validator.Rule(
        async validator=>{

            validator.input("password",formData.password)
            .isEmpty("Should not be empty.");

            validator.input("email",formData.email)
            .isEmail("Invalid Email Address")
            .isEmpty("Should not be empty.");
        }
    );
    let isValidate = await validator.validate();
    if(!isValidate){
        return {
            statusCode:StatusCodes.BadRequest,
            body: {"errors":validator.errors}
        };
    }
    else{
        let passwdHex =  md5(formData.password);
        
        let acc = await tblUser.findByEmailPassword(formData.email,passwdHex);
        
        if(acc){
            acc.password = undefined;
            const token = jwt.sign({ userAccount: acc,authType:"user" }, JKey.user, { expiresIn: '7d' });
            
            return {
                statusCode:StatusCodes.Ok,
                body: {"message":"Login Success","token":token}
            };
        }
        else{
            return {
                statusCode:StatusCodes.UnAuthorize,
                body: {"message":"Incorrect login information, please check your login information again.!"}
            };
        }
        
    }
    
}