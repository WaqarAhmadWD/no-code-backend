
    module.exports = (sequelize, Sequelize) => {
      const blog = sequelize.define(
        'blog',
        {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  counter: {
    type: Sequelize.INTEGER
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
    