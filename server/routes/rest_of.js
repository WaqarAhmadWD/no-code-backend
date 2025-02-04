const { Router } = require("express");
const router = Router();
const { restOfController } = require("../controllers");
router.get("/module/get",restOfController.getModules);
module.exports = router;
