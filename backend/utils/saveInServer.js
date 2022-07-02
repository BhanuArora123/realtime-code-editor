const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const saveFile = async (codeId , code,language) => {
    let filepath = path.join(__dirname,"..","codeFiles",`${codeId}.${language}`);
    let outputFilePath = fs.createWriteStream(filepath);
    let inputReadStream = Readable.from([code]);
    return new Promise((resolve,reject) => {
        outputFilePath.on("open",() => {
            inputReadStream.pipe(outputFilePath);
        });
        inputReadStream.on("close",() => {
            console.log("i am done guys :)")
        })
        outputFilePath.on("finish",() => {
            console.log("i am done guys :)")
            resolve(filepath);
        })
        outputFilePath.on("error",(error) => {
            console.log(error);
            reject(error);
        })
    })
}
module.exports = {
    saveFile
}