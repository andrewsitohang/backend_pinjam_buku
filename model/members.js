const sequelize = require("sequelize");
const db = require("../config/database")

let members = db.define("members",
{
    code:sequelize.STRING,
    name:sequelize.STRING,
    is_penalized:{
        type:"boolean",
        defaultValue:0
    },
    free_at:{
        type:"TIMESTAMP",
        allowNull:true
    },
},{
    freezeTableName:true,
    timestamps:false
});

members.removeAttribute('id');
module.exports = members