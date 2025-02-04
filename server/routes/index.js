const router = require("express").Router();
router.use("/dynamic", require("./dynamic"));
router.use("/rest-of", require("./rest_of"));
module.exports = router;
