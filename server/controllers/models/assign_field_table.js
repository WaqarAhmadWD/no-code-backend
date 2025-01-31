
const table = "assign_field_table";
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
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table",
          key: "id",
        },
      },
      field_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "field",
          key: "id",
        },
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
