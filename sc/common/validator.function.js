
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

    isEmail=(_msg) => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };    
    
        let me = this;

        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(!validateEmail(this.#_input)){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
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
    maxLength=(_len,_msg)=>{
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input !== undefined){
                if(this.#_input.length>_len){
                    this.#_inputErr.push(_msg);
                    this.errors[this.#_key] = this.#_inputErr;
                }
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