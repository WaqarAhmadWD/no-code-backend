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
db.module  = require("../controllers/models/table")(sequelize,Sequelize);
// assosications 
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
