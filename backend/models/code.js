const { INTEGER ,STRING } = require("sequelize");
const seq = require("../utils/db");

const codeSchema = seq.define("code",{
    userName : {
        type:STRING,
        allowNull:false
    },
    codeId:{
        type:INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    codeSnippet:{
        type:STRING,
        defaultValue:""
    }
},{
    timestamps:true
})
module.exports = codeSchema;