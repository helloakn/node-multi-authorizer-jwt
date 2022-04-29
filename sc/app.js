const express = require("express");
const cors = require("cors");

const {ServerConfig} = require('API/config');

const corsOptions = {
    origin: ServerConfig.allowFrom
};

//generate routes prefix
express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const app = express();

app.use(cors(corsOptions));
  
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true
    })
);



require("./routes/main.routes.js")(app);

module.exports = app;