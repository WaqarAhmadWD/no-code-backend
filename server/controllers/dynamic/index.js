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
    const moduler = sequelize.models[module];
    if (!moduler) {
      return res
        .status(404)
        .json({
          message: "module not found",
          data: {
            message: "avaliable modules",
            modules: Object.keys(sequelize.models),
          },
        });
    }
    let hasReferences = [];
    let where = {};
    let includes = [];
    if (req.query.populate) {
      hasReferences = Object.values(model.rawAttributes)
        .map((e) => e?.references || null)
        .filter((e) => e != null);
    }
if (httpMethod === "GET" && method === "get") {
  if (id) {
    const data = await moduler.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: `${module} data not found` });
    }
    return res
      .status(200)
      .json({ message: `${module} data fetched successfully`, data });
  }

  const columns = Object.keys(moduler.rawAttributes);
  let columns_found = [];

  if (req?.search) {
    columns_found = columns
      .filter((column) => column !== "created_at" && column !== "updated_at")
      .map((column) => ({ [column]: req.search }));
  }

  if (req.search) {
    where = { ...where, [Op.or]: columns_found };
  }

  // Only include associations whose foreign key exists in rawAttributes
  const includes = Object.values(moduler.associations)
    .filter((assoc) => {
      const foreignKey = assoc.foreignKey;
      return foreignKey && columns.includes(foreignKey);
    })
    .map((assoc) => ({
      model: assoc.target,
      as: assoc.as,
    }));

  const data = await moduler.findAll({
    ...req.pagination,
    where,
    include: includes,
  });

  return res
    .status(200)
    .json({ message: `${module} data fetched successfully`, data });
}

    if (httpMethod === "GET" && method === "column") {
      const columns = Object.keys(moduler.rawAttributes);
      return res
        .status(200)
        .json({
          message: `${module} column fetched successfully`,
          data: columns,
        });
    }
    if (httpMethod === "POST" && method === "create") {
      const newData = req.body;
      const createdData = await moduler.create(newData);
      return res.status(201).json({
        message: `${module} data created successfully`,
        data: createdData,
      });
    }
    if (httpMethod === "PUT" && method === "edit") {
      const updatedData = await moduler.update(req.body, {
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
      const deletedData = await moduler.destroy({
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
      .json({
        message: `${httpMethod} request has not such path (${method})`,
        data: {
          message: "avalible methods",
          method: ["create", "edit", "get", "delete"],
        },
      });
  } catch (error) {
    res.json({
      message: errorFinder(error) || "something went wrong",
      data: error,
    });
  }
};
