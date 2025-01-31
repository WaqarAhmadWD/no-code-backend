const { Router } = require("express");
const router = Router();
const { dynamicController } = require("../controllers");
const { isAllowed } = require("../middlewares/verifyIdToken");
const url = require("node:url");
const { getRouteParts } = require("../utils/getRouteParts");
let meta = {};
// middleware to calculate and extract the path, http method, module and id
router.use(async (req, res, next) => {
  try {
    const parsedUrl = new url.parse(req.originalUrl);
    const { pathname } = parsedUrl;
    const httpMethod = req.method;
    [module, method, id] = getRouteParts(pathname);
    meta = { httpMethod, module, method, id };
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});
// middlware to take action according to the path, http method, module and id
router.use(
  // middlware to check the authentication and authorization.
  // isAllowed(meta?.module, { [`do_${meta?.method}`]: true }),
  // function to return response based on path, http method, module and id
  async (req, res, next) => {
    try {
      return dynamicController(req, res, meta);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Something went wrong" });
    }
  }
);
module.exports = router;
