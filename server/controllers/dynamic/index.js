const { Op } = require("sequelize");
const { sequelize } = require("../../configDB");
const { errorFinder } = require("../../utils/ErrorHandlers");
module.exports = async (req, res, { httpMethod, module, method, id }) => {
  try {
    if (!module || !method) {
      return res.status(400).json({
        message: !module ? "module is not added" : "method is not added",
      });
    }
    if (!sequelize.models[module]) {
      return res.status(404).json({ message: "module not found", data:{message:"avaliable modules",modules:Object.keys(sequelize.models)} });
    }
    let hasReferences = [];
    let where = {};
    let includes = [];
    if(req.query.populate){
      hasReferences = Object.values(model.rawAttributes).map(e=>e?.references || null).filter(e=>e!=null)
    }
    if (httpMethod === "GET" && method === "get") {
      if (id) {
        const data = await sequelize.models[module].findByPk(id);
        if (!data) {
          return res.status(404).json({ message: `${module} data not found` });
        }
        return res
          .status(200)
          .json({ message: `${module} data fetched successfully`, data });
      }
      const model = sequelize.models[module];

      console.log(hasReferences)
      const columns = Object.keys(model.rawAttributes);
      let columns_found = [];
      if(req?.search){
        columns_found = columns.map(column =>{
          if(column !== "created_at" && column !== "updated_at"){
            return {[column]:req.search}
          }else{
            return null;
          }
        }).filter(column => column!=null);
      }
      if(req.search){
        where={...where,[Op.or]:columns_found};
      }
      const data = await model.findAll({...req.pagination,where});
      return res
        .status(200)
        .json({ message: `${module} data fetched successfully`, data });
    }
    if (httpMethod === "GET" && method === "column") {
      const model = sequelize.models[module];
      const columns = Object.keys(model.rawAttributes);
      return res
        .status(200)
        .json({ message: `${module} column fetched successfully`, data:columns });
    }
    if (httpMethod === "POST" && method === "create") {
      const newData = req.body;
      const createdData = await sequelize.models[module].create(newData);
      return res.status(201).json({
        message: `${module} data created successfully`,
        data: createdData,
      });
    }
    if (httpMethod === "PUT" && method === "edit") {
      const updatedData = await sequelize.models[module].update(req.body, {
        where: { id },
      });
      if (updatedData[0] === 0) {
        return res.status(404).json({ message: `${module} data not found` });
      }
      return res.status(200).json({
        message: `${module} data updated successfully`,
        data: req.body,
      });
    }
    if (httpMethod === "DELETE" && method === "delete") {
      const deletedData = await sequelize.models[module].destroy({
        where: { id },
      });
      if (deletedData === 0) {
        return res.status(404).json({ message: `${module} data not found` });
      }
      return res
        .status(200)
        .json({ message: `${module} data deleted successfully` });
    }

    return res
      .status(404)
      .json({ message: `${httpMethod} request has not such path (${method})`,data:{message:"avalible methods",method:["create","edit","get","delete"]} });
  } catch (error) {
    res.json({
      message: errorFinder(error) || "something went wrong",
      data: error,
    });
  }
};
