 const model = require("../model/index");
 const moment = require("moment")
 const controller = {};

controller.create = async function(req,res){
    try {
        const { member_code,books } = req.body 
        console.log(books);
        const member = await model.members.findOne({where:{code:member_code}})
        let isContinue = false;
        if (member === null) {
            res.status(404).json({
                statusCode: 404,
                message: "Member not found",
            })
        }else if(member.is_penalized === 1 && moment().locale("id").format("YYYY-MM-DD HH:mm:ss") < moment(member.free_at).locale("id").format("YYYY-MM-DD HH:mm:ss")){
            res.status(500).json({
                statusCode: 500,
                message: "Member is currently being penalized",
            })
        }else if(Object.keys(books).length > 2){
            res.status(500).json({
                statusCode: 500,
                message: "Maximum 2 books can be borrowed",
            })
        }else if(member.is_penalized === 1 && moment().locale("id").format("YYYY-MM-DD HH:mm:ss") > moment(member.free_at).locale("id").format("YYYY-MM-DD HH:mm:ss")){
            await model.members.update({
                is_penalized:0,
                free_at:null
            },{
                where:{
                    code:member_code
                }
            });
            isContinue = true;
        }else{
            isContinue = true;
        }
        if (isContinue) {
            let bookAvailable = await model.books.findAll({
                where:{
                    stock:"1"
                }
            })
            let availableBooks = [];
            let borrowedBooks = [];
            for (const key in bookAvailable) {
                availableBooks[key] = bookAvailable[key].code
            }
            isContinue = false;
            for (const key in books) {
                if (!availableBooks.includes(books[key].code)) {
                    res.status(404).json({
                        statusCode: 404,
                        message: `Book with code : ${books[key].code} is currently not available`,
                    })
                }else{
                    if(parseInt(key)+1 == Object.keys(books).length) isContinue = true;
                    borrowedBooks[key] = books[key].code
                }
            }
            if (isContinue) {
                let borrow_at = moment().locale("id").format("YYYY-MM-DD HH:mm:ss")
                let max_return_at = moment().locale("id").add("7","days").format("YYYY-MM-DD HH:mm:ss") 
                const createBorrow = await model.borrows.create({
                    member_code:member_code,
                    borrow_at:borrow_at,
                    max_return_at:max_return_at,
                    status:"on_borrowing",
                })
                if (createBorrow.code) {
                   const updateBookStatus = await model.books.update({stock:0},{where: { code:borrowedBooks } })
                    for (const key in borrowedBooks) {
                            await model.borrow_datas.create({
                                borrow_code : createBorrow.code,
                                book_code : borrowedBooks[key],
                            })
                    }
                    res.status(200).json({
                        statusCode: 200,
                        message: "Borrowing books successfully",
                        data:createBorrow
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

