const { sequelize } = require("../../configDB");
exports.getModules = async (req,res) => {
    try {
        res.status(200).json({message:"module fetch successfully",data:Object.keys(sequelize?.models)})
    } catch (error) {
        res.status(500).json({message:error?.message || "Something went wrong"})
    }
};
