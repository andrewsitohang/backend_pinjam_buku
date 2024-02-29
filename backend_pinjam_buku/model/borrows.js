const sequelize = require("sequelize");
const db = require("../config/database")

let borrows = db.define("borrows",
{
    code:{
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    member_code:sequelize.STRING,
    borrow_at:{
        type:"DATETIME"
    },    
    max_return_at:{
        type:"DATETIME"
    },    
    status:sequelize.STRING,    
},{
    freezeTableName:true,
    timestamps:false
});

borrows.removeAttribute('id');
module.exports = borrows