const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("realtimecode","root","jaanhaimeri12345#",{
    host:"localhost",
    dialect:"mysql"
})
module.exports = sequelize;