const express = require("express")
const router = express.Router();
const controller = require("../controller/index")


router.get("/",controller.books.getData);
router.get("/check",controller.books.check);
router.post("/create",controller.books.create)

router.put("/update/:code",controller.books.update)
router.delete("/delete",controller.books.delete)

module.exports = router;