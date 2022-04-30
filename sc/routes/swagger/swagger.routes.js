
const swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swaggers.json');
module.exports = app => {
    app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}
