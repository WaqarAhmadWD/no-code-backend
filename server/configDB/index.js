const Sequelize = require("sequelize");
require("dotenv").config();
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.module  = require("../controllers/models")(sequelize,Sequelize);
db.dynamic_module  = require("../controllers/models/dynamic_index")(sequelize,Sequelize);

// assocications 
// super many to many association of field and table
db.module.field.hasMany(db.module.assign_field_table,{
  foreignKey: "field_id",
})
db.module.assign_field_table.belongsTo(db.module.field,{
  foreignKey: "field_id",
})
db.module.table.hasMany(db.module.assign_field_table,{
  foreignKey: "table_id",
})
db.module.assign_field_table.belongsTo(db.module.table,{
  foreignKey: "table_id",
})
db.module.table.belongsToMany(db.module.field,{
  through: db.module.assign_field_table,
  foreignKey: "table_id",
  otherKey: "field_id",
})
db.module.field.belongsToMany(db.module.table,{
  through: db.module.assign_field_table,
  foreignKey: "field_id",
  otherKey: "table_id",
})
// super many to many association of attributes and field
db.module.attribute.hasMany(db.module.assign_attribute_field,{
  foreignKey: "attribute_id",
})
db.module.assign_attribute_field.belongsTo(db.module.attribute,{
  foreignKey: "attribute_id",
})
db.module.field.hasMany(db.module.assign_attribute_field,{
  foreignKey: "field_id",
})
db.module.assign_attribute_field.belongsTo(db.module.field,{
  foreignKey: "field_id",
})
db.module.field.belongsToMany(db.module.attribute,{
  through: db.module.assign_attribute_field,
  foreignKey: "field_id",
  otherKey: "attribute_id",
})
db.module.attribute.belongsToMany(db.module.field,{
  through: db.module.assign_attribute_field,
  foreignKey: "attribute_id",
  otherKey: "field_id",
})

// Run the sync method to create the tables
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tables connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

module.exports = db;
