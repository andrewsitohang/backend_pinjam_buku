const sequelize = require("sequelize");
const db = require("../config/database")

let returns = db.define("returns",
{
    code:{
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },    
    borrow_code:sequelize.INTEGER,
    is_violate:sequelize.BOOLEAN,    
    return_at:{
        type:"DATETIME"
    },        
},{
    freezeTableName:true,
    timestamps:false
});

returns.removeAttribute('id');
module.exports = returns