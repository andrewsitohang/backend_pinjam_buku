const express = require("express")
const router = express.Router();
const controller = require("../controller/index")


router.get("/",controller.members.getData);
router.post("/create",controller.members.create)

router.put("/update/:code",controller.members.update)
router.delete("/delete",controller.members.delete)

module.exports = router;