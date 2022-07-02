const codeModel = require("../models/code");
const { pyCompiler, jsCompiler, javaCompiler, cppCompiler } = require("../utils/compilers");
const { saveFile } = require("../utils/saveInServer");

exports.saveCode = async(req,res,next) => {
    try {
        let {code,userName,codeId,language} = req.body;
        let codeData;
        codeId = `lan_${language}_${codeId}`;
        await saveFile(codeId,code,language);
        if(codeId){
            codeData = codeModel.findByPk(codeId);
            codeData.codeSnippet = code;
            await codeData.save();
        }else{
            codeData = codeModel.create({
                codeSnippet:code,
                username:userName
            });
        }
        return res.status(400).json({
            message : "code saved successfully",
            codeData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : error.message
        })
    }
}
exports.getCode = async (req,res,next) => {
    try {
        let {codeId,language} = req.body;
        codeId = `lan_${language}_${codeId}`;
        let codeData = await codeModel.findByPk(codeId);
        return res.status(200).json({
            code : codeData?.codeSnippet,
            message : "code fetched successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message :error.message
        })
    }
}
exports.runCode = async (req,res,next) => {
    try {
        let {code , codeId ,userName , language ,codeInput} = req.body;
        codeId = `lan_${language}_${codeId}`;
        let codeData = await codeModel.findByPk(codeId);
        // saving code in server.
        let codeFilePath = await saveFile(codeId,code,language);
        // execute code;
        let codeOutput = "";
        let outputfilePath = "";
        if(language === "py"){
            let {output , codeFilePath} = await pyCompiler(codeId,codeInput);
            codeOutput = output;
            outputfilePath = codeFilePath;
        }
        else if(language === "js"){
            let {output , codeFilePath} = await jsCompiler(codeId,codeInput);
            codeOutput = output;
            outputfilePath = codeFilePath;
        }
        else if(language === "java"){
            let {output , codeFilePath} = await javaCompiler(codeId,codeInput);
            codeOutput = output;
            outputfilePath = codeFilePath;
        }
        else{
            let {output , codeFilePath} = await cppCompiler(codeId,language,codeInput);
            codeOutput = output;
            outputfilePath = codeFilePath;
        }
        if(!codeData){
            // save code 
            codeModel.create({
                codeSnippet:codeFilePath,
                userName:userName,
                codeId,
                codeOutput:outputfilePath,
                language
            });
        }
        else{
            codeData.codeOutput = outputfilePath;
            codeData.codeSnippet = codeFilePath;
        }
        return res.status(200).json({
            message :"code executed successfully!",
            codeOutput
        });
    } catch (error) {
        let {codeId, userName, code,language} = req.body;
        let codeData = await codeModel.findByPk(codeId);
        let codeFilePath = await saveFile(codeId,code,language);
        if(!codeData){
            // save code 
            codeModel.create({
                codeSnippet:codeFilePath,
                userName:userName,
                codeId,
                errors:JSON.stringify(error.errorFilePath),
                language
            });
        }
        else{
            codeData.errors = JSON.stringify(error.errorFilePath);
            codeData.codeSnippet = codeFilePath;
        }
        return res.status(200).json({
            message : "compilation failed",
            errors:error.err.split(language)[1]
        })
    }
}