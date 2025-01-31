const table = "association";
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
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      to_associated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "table",
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
