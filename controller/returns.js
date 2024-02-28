 const model = require("../model/index");
 const moment = require("moment")
 const controller = {};

controller.create = async function(req,res){
    try {
        const { borrow_code,books } = req.body 
        const borrow = await model.borrows.findOne({where:{code:borrow_code}})
        if (borrow === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Borrowing ID not found",
            })
        }else if(borrow.status === "returned"){
            res.status(500).json({
                statusCode: 500,
                message: `Books already returned`,
            })
        }
        else{
            const borrow_data = await model.borrow_datas.findAll({
                where:{
                    borrow_code : borrow_code
                }
            })
            let borrowedBooks = [];
            for (const key in borrow_data) {
                borrowedBooks[key] = borrow_data[key].book_code
            }
            let isContinue = false;
            if (Object.keys(books).length == borrowedBooks.length) {
                for (const key in books) {
                    if (!borrowedBooks.includes(books[key].code)) {
                        res.status(404).json({
                            statusCode: 404,
                            message: `Book with code : ${books[key].code} not match with your borrowing data`,
                        })
                    } else {
                        if(parseInt(key)+1 == Object.keys(books).length) isContinue = true;                    
                    }
                }                
            } else {
                res.status(404).json({
                    statusCode: 404,
                    message: `Books not match with your borrowing data`,
                })
            }
            if (isContinue) {
                let now = moment().locale("id").format("YYYY-MM-DD HH:mm:ss")
                let max_return_at = moment(borrow.max_return_at).locale("id").format("YYYY-MM-DD HH:mm:ss")
                let is_penalized = (now > max_return_at) ? 1 : 0;
                
                const returns = await model.returns.create({
                    borrow_code:borrow.code,
                    is_violate:is_penalized,
                    return_at:now
                })
                if (returns.code) {
                    if (is_penalized === 1) {
                        await model.members.update({
                            is_penalized:1,
                            free_at:moment().locale("id").add("3","days").format("YYYY-MM-DD HH:mm:ss")
                        },{
                            where:{
                                code:borrow.member_code
                            }
                        })
                    }
                    await model.books.update({stock:1},{where:{code:borrowedBooks}});
                    await model.borrows.update({status:"returned"},{where:{code:borrow.code}});
                    res.status(200).json({
                        statusCode: 200,
                        message: "Books returned successfully",
                        data:returns
                    })
                }
            }            
        }
    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: error.message,
        })
    }
}

module.exports = controller;

