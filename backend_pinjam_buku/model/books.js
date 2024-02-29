const sequelize = require("sequelize");
const db = require("../config/database")

let books = db.define("books",
{
    code:sequelize.STRING,
    title:sequelize.STRING,    
    author:sequelize.STRING,    
    stock:sequelize.INTEGER,    
},{
    freezeTableName:true,
    timestamps:false
});

books.removeAttribute('id');
module.exports = books