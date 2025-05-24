const { sequelize } = require("../../configDB");
const { createTables } = require("../operation_perfomer/db_operations");
exports.getModules = async (req,res) => {
    try {
        res.status(200).json({message:"module fetch successfully",data:Object.keys(sequelize?.models)})
    } catch (error) {
        res.status(500).json({message:error?.message || "Something went wrong"})
    }
};
