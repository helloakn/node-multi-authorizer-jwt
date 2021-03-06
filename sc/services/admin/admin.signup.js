// program base on aws lambda function style
"use strict";
const md5 = require('md5');

const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');

const tblAdmin = (new (require('API/models/admin'))());

exports.handler = async (event,callback) => {

    const formData = event.body;
    
    const validator = await Validator.Rule(
        async validator=>{

            validator.input("name",formData.name)
            .maxLength(50,"Maximum length of input name is 50")
            .isEmpty("Should not be empty.");

            validator.input("password",formData.password)
            .isEmpty("Should not be empty.");

            validator.input("email",formData.email)
            .isEmail("Invalid Email Address")
            .isEmpty("Should not be empty.")
            .customFunction(async v=>{
               if(formData.email){
                    let acc = await tblAdmin.findByEmail(formData.email);
                    //console.log('acc',acc)
                    if(acc){
                        v.setError("Account already existed with this email.");
                    }
               }
            });
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
        let passwdHex = md5(formData.password);
        try{
            let tmpAcc = await tblAdmin.insertData({
                name : formData.name,
                email : formData.email,
                password : passwdHex
            });
            console.log(tmpAcc)
            if(tmpAcc){
                return {
                    statusCode:StatusCodes.Ok,
                    body: {"message":"Successfully Sign Up!"}
                };
            }
            else{
                return {
                    statusCode:StatusCodes.BadRequest,
                    body: {"message":"Please check your input"}
                };
            }
            
        }
        catch(er){
            return {
                statusCode:StatusCodes.BadRequest,
                body: {"message":"Please check your input"}
            };
        }
        
    }
    
}