const sequelize = require("sequelize");
const db = require("../config/database")

let borrow_datas = db.define("borrow_datas",
{
    code:{
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },    
    borrow_code:sequelize.INTEGER,     
    book_code:sequelize.STRING,     
},{
    freezeTableName:true,
    timestamps:false
});

borrow_datas.removeAttribute('id');
module.exports = borrow_datas