const { Router } = require("express");
const router = Router();
const { restOfController } = require("../controllers");
const { createTables } = require("../controllers/operation_perfomer/db_operations");
router.get("/module/get",restOfController.getModules);
router.get("/flush",createTables)
module.exports = router;
