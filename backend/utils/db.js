const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("realtimecode","root","password",{
    host:"localhost",
    dialect:"mysql"
})
module.exports = sequelize;