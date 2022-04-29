
class Validator{

    #promiseList=[];
    #_input;
    #_key;
    #_inputErr;
    constructor(){
        this.errors = {};
    }

    static Rule= async (_callBack) =>{
        const validator = new Validator();
        await  _callBack(validator);
        return validator;
        
    }

    validate = ()=>{
       return Promise.all(this.#promiseList).then((values) => {
            return Object.keys(this.errors).length==0
        });
    }

    input=(_key,_input)=>{
        this.#_input = _input;
        this.#_key = _key;
        this.#_inputErr = [];
        return this;
    }

    isEmpty= (_msg)=>{
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(this.#_input==""){  
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
        return this;
    }
    
    isValidDateFormat=(_msg)=>{
        const isDate=(_d)=>{
            let dArray = _d.split("/");
            if(dArray.length!=3) return false;
            if(dArray[0].length>2 || dArray[1].length>2 || dArray[2].length>4) return false;
            if(isNaN(dArray[0]) || isNaN(dArray[1]) || isNaN(dArray[2])) return false;
            if(_d.indexOf("-") != -1 ) return false;
            return true;
        }
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(!isDate(this.#_input)){  
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
        return this;
    }
    isValidDate=(_msg)=>{

        const daysInMonth = function (m, y) {
            switch (m) {
                case 1 :
                    return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
                case 8 : case 3 : case 5 : case 10 :
                    return 30;
                default :
                    return 31
            }
        }
        const isTrueDate=(_d)=>{
            let d = new Date(_d);
            let tf = d instanceof Date && !isNaN(d);
            if(tf){
                let dateArray = _d.split('/');
                let month = parseInt(dateArray[0]);
                month = parseInt(month, 10) - 1;
                let day = parseInt(dateArray[1]);
                let year = parseInt(dateArray[2]);
                return month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year);
            }
            else{
                return false;
            }
        }
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(!isTrueDate(this.#_input)){  
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
        return this;
    }

    customFunction=async (_callback)=>{
        //await _callback(this);

        //let me = this;
        let me = this;
        let obj = new Promise(async resolve=>{
            await _callback(me);
            resolve(me);
            
        })
        this.#promiseList.push(obj);
        return this;
    }
    setError=(_msg,_tmpKey=null)=>{
        this.#_inputErr.push(_msg);
        this.errors[_tmpKey||this.#_key] = this.#_inputErr;
    }

}


module.exports  = Validator;