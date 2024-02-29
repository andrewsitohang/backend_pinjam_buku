 const model = require("../model/index");
 const controller = {};

controller.getData = async function(req,res){
    try {
        let data = await model.books.findAll()
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

controller.check = async function(req,res){
    try {
        let data = await model.books.findAll({where:{stock:1}})
        res.status(200).json({
            statusCode: 200,
            message: "Check existing books",
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
        const find = await model.books.findOne({where:{code:req.body.code}})
        if (find === null) {
            let data = await model.books.create({
                code:req.body.code,
                title:req.body.title,
                author:req.body.author,
                stock:req.body.stock,
            })
            res.status(201).json({
                statusCode: 201,
                message: "Data created successfully",
                data: data,        
            })            
        }else{
            res.status(404).json({
                statusCode: 404,
                message: "Data already exist",
            })            
        }
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

controller.update = async function(req,res){
    try {
        const find = await model.books.findOne({where:{code:req.params.code}})
        if (find === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Data not found",
            })
        } else {
            await model.books.update({
                title:req.body.title,
                author:req.body.author,
                stock:req.body.stock            
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
        const find = await model.books.findOne({where:{code:req.body.code}})
        if (find === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Data not found",
            })
        } else {
            await model.books.destroy({
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

