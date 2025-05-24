module.exports = (sequelize, Sequelize) => ({
    blog: require('./dynamic/blog.js')(sequelize, Sequelize),
})