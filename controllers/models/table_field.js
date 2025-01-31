const table = "table_field";
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
      table: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table",
          key: "id",
        },
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
