
'use strict'
const Database = require('API/database');

class UserModel extends Database{
    constructor() {
        super();
        this.tableName = 'tblUser';
       
    }
}

module.exports = UserModel;