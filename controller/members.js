 const model = require("../model/index");
 const sequelize = require("../config/database")
 const { QueryTypes } = require("sequelize")
 const controller = {};

controller.getData = async function(req,res){
    try {
        let data = await sequelize.query("SELECT members.*,(SELECT COUNT(borrow_datas.code) FROM borrow_datas JOIN borrows ON borrow_datas.borrow_code = borrows.code WHERE borrows.status='on_borrowing' AND borrows.member_code = members.code) as books_being_borrowed FROM members",{
            type:QueryTypes.SELECT
        })
        res.status(200).json({
            statusCode: 200,
            message: "Get data successfully",
            data: data,        
        })
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

controller.create = async function(req,res){
    try {
        const maxCode = await sequelize.query("SELECT MAX(RIGHT(code,3)) AS code FROM members",{
            type: QueryTypes.SELECT
        });
        let newCode = (!maxCode[0].code) ? "M001" : `M00${parseInt(maxCode[0].code)+1}`;
        let data = await model.members.create({
            code:newCode,
            name:req.body.name,
            is_penalized:0
        })
        res.status(201).json({
            statusCode: 201,
            message: "Data created successfully",
            data: data,        
        })
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

controller.update = async function(req,res){
    try {
        const find = await model.members.findOne({where:{code:req.params.code}})
        if (find === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Data not found",
            })
        } else {
            await model.members.update({
                name:req.body.name,
            },{
                where:{
                    code:req.params.code
                }
            })
            res.status(200).json({
                statusCode: 200,
                message: "Data updated successfully",
            })        
        }
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

controller.delete = async function(req,res){
    try {
        const find = await model.members.findOne({where:{code:req.body.code}})
        if (find === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Data not found",
            })
        } else {
            await model.members.destroy({
                where:{
                    code:req.body.code
                }
            })
            res.status(200).json({
                statusCode: 200,
                message: "Data deleted successfully",
            })        
        }
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

module.exports = controller;

