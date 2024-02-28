const express = require("express")
const router = express.Router();
const controller = require("../controller/index")


router.post("/create",controller.returns.create)

module.exports = router;