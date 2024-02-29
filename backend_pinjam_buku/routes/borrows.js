const express = require("express")
const router = express.Router();
const controller = require("../controller/index")


router.post("/create",controller.borrows.create)

module.exports = router;