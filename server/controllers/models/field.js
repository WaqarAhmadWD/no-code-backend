const table = "field";
module.exports = (sequelize, Sequelize) => {
  const ModelObj = sequelize.define(
    table,
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      freezeTableName: true,
   
    }
  );

  return ModelObj;
};
