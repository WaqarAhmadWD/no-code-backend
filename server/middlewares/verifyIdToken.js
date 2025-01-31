const {
  Users,
  assign_roles_module,
  module_registration,
  Roles,
} = require("../configDB");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendResponse = require("../utils/responseFormatter");
const { Op } = require("sequelize");

module.exports = {
  isAllowed: (model = null, CRUD = null) => {
    return async (req, res, next) => {
      try {
        const {limit, offset,search} = req.query;
        if (limit){
          req.pagination = {limit:parseInt(limit)};
        }
        if (offset){
          req.pagination = {...req.pagination,offset:parseInt(offset)};
        }
        if (search){
  
          req.search = { [Op.like]: `%${search}%` };
        }
        if (process.env.TESTING === "true") {
          return next();
        }
        const token = req.headers?.authorization?.split(" ")[1];
        const tokenExtractor = req?.headers?.cookie;
        const tokenCookie = tokenExtractor?.split('=')[1];
        // console.log("tokenCookie",tokenCookie); 
        if (!token) {
          return sendResponse(res, 403, "No Token Found");
        }

        const decode = await jwt.verify(token, process.env.JWD_TOKEN);

        const user = await Users.findOne({
          where: { slug: decode.slug },
          include: [
            {
              model: Roles,
              through: { attributes: [] },
              attributes: ["id", "name"],
            },
          ],
        });
        if (!user) {
          return sendResponse(res, 403, "User not found");
        }
        if (!user.roles || user?.roles?.length === 0) {
          return sendResponse(
            res,
            403,
            "User has no role assigned"
          );
        }
        const hasSuperAdmin = await user.roles.some(
          (item) => item?.name === "super_admin"
        );
        
        if(!user.active && !hasSuperAdmin) {
          return sendResponse(res, 404, "User is not active", null);
        }
        req.user = user;
        if (hasSuperAdmin) {
          req.is_admin = true;
          return next();
        }
        const module = await module_registration.findAll({
          where: { name: model },
        });
        if (!module) {
          return res.status(403).json({
            message: `${model} module doesn't exist`,
          });
        }
        const module_ids = module?.map(e=>e.id);
        req.body.user_id = user.id;
       for (const roleAssignment of user.roles) {
          const assignRole = await assign_roles_module.findOne({
            where: {
              role_id: roleAssignment.id,
              module_id: module_ids,
              ...CRUD,
            },
          });

          if (assignRole) {
          
            return next();
          }
        }

        return res.status(403).json({
          message: `${req?.user?.email}(email) is not allowed to perform this action on the ${module?.name} module.`,
        });
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return sendResponse(
            res,
            403,
            "403 Forbidden | Token has been expired"
          );
        } else {
          return sendResponse(res, 401, "Middleware:" + err);
        }
      }
    };
  },
};
