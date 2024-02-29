const members = require("./members")
const books = require("./books")
const borrows = require("./borrows")
const borrow_datas = require("./borrow_datas")
const returns = require("./returns")
const model = {}

model.members = members
model.books = books
model.borrows = borrows
model.borrow_datas = borrow_datas
model.returns = returns

module.exports = model