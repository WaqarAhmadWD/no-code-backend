
    module.exports = (sequelize, Sequelize) => {
      const blog = sequelize.define(
        'blog',
        {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
},
        {
          underscored: true,
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at",
          freezeTableName: true,
        }
      );
    
      return blog;
    };
    