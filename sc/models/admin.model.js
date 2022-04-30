
const Database = require('API/database');

class AdminModel extends Database{
    constructor() {
        super();
        this.tableName = 'tblAdmin';
       
    }
}


module.exports = AdminModel;