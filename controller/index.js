const members = require("./members")
const books = require("./books")
const borrows = require("./borrows")
const returns = require("./returns")
const controller = {}

controller.members = members
controller.books = books
controller.borrows = borrows
controller.returns = returns

module.exports = controller