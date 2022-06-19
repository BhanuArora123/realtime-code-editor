const codeModel = require("../models/code");

exports.saveCode = async(req,res,next) => {
    try {
        let {code,userName,codeId} = req.body;
        let codeData;
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
        let codeData = await codeModel.findByPk(req.body.codeId);
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