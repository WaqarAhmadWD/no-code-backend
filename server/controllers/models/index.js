module.exports = (sequelize, Sequelize) => ({
    table:require("./table")(sequelize, Sequelize),
    setting:require("./setting")(sequelize, Sequelize),
    association:require("./association")(sequelize, Sequelize),
    attribute:require("./attribute")(sequelize, Sequelize),
    field:require("./field")(sequelize, Sequelize),
    assign_attribute_field:require("./assign_attribute_field")(sequelize, Sequelize),
    assign_field_table:require("./assign_field_table")(sequelize, Sequelize),
})