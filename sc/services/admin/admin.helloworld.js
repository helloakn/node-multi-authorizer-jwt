// program base on aws lambda function style

const {StatusCodes} = require('API/config');
const Validator = require('API/functions/validator');

exports.handler = async (event,callback) => {

    const formData = event.body;
    
    const validator = await Validator.Rule(
        async validator=>{

            // await validator.input("start_date",formData.start_date)
            // .isValidDateFormat("Input Format must be mm/dd/yyyy")
            // .isValidDate("Start Date is incorrect, Please careful the leap years too");

            // validator.input("end_date",formData.end_date)
            // .isValidDateFormat("Input Format must be mm/dd/yyyy")
            // .isValidDate("End Date is incorrect, Please careful the leap years too");

            // validator.input('dates',null).customFunction(async v=>{
            //     if(DF.isValidDate(formData.start_date) && DF.isValidDate(formData.end_date)){
            //         let diff = DF.dateDiff(formData.end_date,formData.start_date);
            //         if(diff===0){
            //             v.setError("Start Date and End Date must not be the same.");
            //         }
            //         else if(diff<1){
            //             v.setError("End Date must be greater than Start Date ");
            //         }
            //         else if(diff==1){
            //             v.setError("Interval of start date and end date must be at least 2");
            //         }
            //     }
            // });

        }
    );
    let isValidate = true;
    return {
        statusCode: isValidate?StatusCodes.Ok:StatusCodes.BadRequest,
       // body: {"errors":validator.errors}
       body: {"errors":"hello"}
    };
}