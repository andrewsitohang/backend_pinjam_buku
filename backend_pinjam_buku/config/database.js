let sequelize = require("sequelize");
let db = new sequelize('db_backend_express','root','',{
    dialect:"mysql",
    host:"localhost"
});

module.exports = db;