const { INTEGER ,STRING } = require("sequelize");
const seq = require("../utils/db");

const codeSchema = seq.define("code",{
    userName : {
        type:STRING,
        allowNull:false
    },
    codeId:{
        type:STRING,
        allowNull:false,
        primaryKey:true
    },
    codeSnippet:{
        type:STRING,
        defaultValue:""
    },
    language :{
        type : STRING,
        defaultValue:"js",
        allowNull:false
    },
    codeOutput : {
        type : STRING,
        defaultValue:""
    },
    errors : {
        type : STRING,
        allowNull:true
    }
},{
    timestamps:true
})
module.exports = codeSchema;