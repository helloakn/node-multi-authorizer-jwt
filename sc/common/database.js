
var sqlite3 = require('sqlite3');

const {DatabaseConfig} = require('API/config');
const SQL = new sqlite3.Database(DatabaseConfig.filePath, (err) => {
    if (err) {
     // console.log('Could not connect to database', err)
    } else {
     // console.log('Connected to database')
    }
});

class Database{
    constructor() {
        this.db = SQL;
    }

    createTable= async ()=>{
        let res =  await this.db.run(`
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text not null,
                email text not null,
                password text not null
            );
        `);
        return res;
    }

    insertData = async (_newRecord) => {
        let columns = [];
        let values = [];
        for (const [key, value] of Object.entries(_newRecord)) {
            columns.push(key);
            let tmpvalue  = value;
            
            values.push(!isNaN(value)?value:'"'+tmpvalue?.replace(/"/g,'\\"')+'"');
        }

        let query = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES(${values.join(',')})`;
        return await this.db.run(query);
    }//end insertData function    

    findByEmail = async(_email)=>{
        let query = `SELECT * FROM ${this.tableName} WHERE email='${_email}'`;
        return new Promise(resolve=>{
            this.db.get(query,(err, result) => {
                if (err) {
                  console.log(err)
                } else {
                    resolve(result);
                }
            })
        });
        
    }
    findByEmailPassword = async(_email,_password)=>{
        let query = `SELECT * FROM ${this.tableName} WHERE email='${_email}' AND password='${_password}'`;

        return new Promise(resolve=>{
            this.db.get(query,(err, result) => {
                if (err) {
                  console.log(err)
                } else {
                    resolve(result);
                }
            })
        });
        
    }
}

module.exports = Database;