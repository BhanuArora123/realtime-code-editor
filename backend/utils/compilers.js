const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const pyCompiler = (codeId,codeInput) => {
    return new Promise((resolve, reject) => {
        let output;
        var codeOutputFile = fs.createWriteStream(path.join(__dirname, "..", "codeFiles", `codeOutputpy${codeId}.txt`),{})
        const filePath = path.join(__dirname,"..","codeFiles",`${codeId}.py`);
        let pythonScript = spawn("python", [ filePath, codeInput ]);
        let errorFilePath = path.join(__dirname,"..","errors",`errors-${codeId}.txt`);
        let errorPathStream = fs.createWriteStream(errorFilePath);
        pythonScript.stdout.on("data", (data) => {
            console.log("hi");
            let dataReq = data.toString();
            output = dataReq;
            console.log(dataReq);
        })
        console.log(codeInput);
        pythonScript.stdin.write(codeInput);
        pythonScript.stdin.end();
        codeOutputFile.on("open", () => {
            pythonScript.stdout.pipe(codeOutputFile);
        })

        codeOutputFile.on("error", (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
        })
        codeOutputFile.on("finish", () => {
            console.log("stream closed successfully");
            resolve({output,codeOutputFile:filePath});
        })
        pythonScript.stderr.on("data",(err) => {
            console.log(err);
            pythonScript.stderr.pipe(errorPathStream);
            reject({err, errorFilePath});
        })
        pythonScript.on("close", (code) => {
            console.log("child process closed successfully with code = " + code);
        })
    })
}
const jsCompiler = (codeId) => {
    return new Promise((resolve, reject) => {
        let output;
        var codeOutputFile = fs.createWriteStream(path.join(__dirname, "..", "codeFiles", `codeOutputjs${codeId}.txt`),{})
        const filePath = path.join(__dirname,"..","codeFiles",`${codeId}.js`);
        let pythonScript = spawn("node", [ filePath ]);
        let errorFilePath = path.join(__dirname,"..","errors",`errors-${codeId}.txt`);
        let errorPathStream = fs.createWriteStream(errorFilePath);
        pythonScript.stderr.on("data",(err) => {
            console.log(err.toString());
            pythonScript.stderr.pipe(errorPathStream);
            reject({err, errorFilePath});
        })
        pythonScript.stdout.on("data", (data,err) => {
            console.log(err);
            let dataReq = data.toString();
            output = dataReq;
            console.log(dataReq);
        })
        codeOutputFile.on("open", () => {
            pythonScript.stdout.pipe(codeOutputFile);
        })
        codeOutputFile.on("error", (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
        })
        codeOutputFile.on("finish", () => {
            console.log("stream closed successfully");
            resolve({output,codeOutputFile:filePath});
        })
        pythonScript.on("close", (code) => {
            console.log("child process closed successfully with code = " + code);
        })
    })
}
const cppCompiler = (codeId,language,codeInput) => {
    if(!language){
        language = "cpp";
    }
    return new Promise((resolve, reject) => {
        let output;
        const filePath = path.join(__dirname,"..","codeFiles",`${codeId}.${language}`);
        const filePathExe = path.join(__dirname,"..",`a.exe`);
        let errorFilePath = path.join(__dirname,"..","errors",`errors-${codeId}.txt`);
        let errorPathStream = fs.createWriteStream(errorFilePath);
        let execCpp = exec(`${language === "cpp"?"g++":"gcc"} "${filePath}"`,(err,stdout,stderr) => {
            if(err){
                console.log(err);
            }
            if(stderr){
                console.log(stderr);
                errorPathStream.write(stderr.toString());
                reject({err:stderr, errorFilePath});
            }
            let pythonScript = spawn(`${filePathExe}`,{
                env:process.env
            });
            // pythonScript.stdin.write
            // pythonScript.stdout.pipe(process.stdout);
            pythonScript.stdout.on("data", (data) => {
                let dataReq = data.toString();
                output = dataReq;
                console.log(dataReq);
            })
            pythonScript.stdin.write(codeInput);
            pythonScript.stdin.end();
            pythonScript.stderr.on("data",(err) => {
                pythonScript.stderr.pipe(errorPathStream);
                reject({err:stderr, errorFilePath});
            })
            var codeOutputFile = fs.createWriteStream(path.join(__dirname, "..", "codeFiles", `codeOutput${language}${codeId}.txt`),{});
            codeOutputFile.on("open", () => {
                pythonScript.stdout.pipe(codeOutputFile);
            })
            codeOutputFile.on("error", (err) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
            })
            codeOutputFile.on("finish", () => {
                console.log("stream closed successfully");
                resolve({output,codeOutputFile:filePath});
            })
            pythonScript.on("error",(err) => {
                console.log(err);
            })
            pythonScript.on("close", (code) => {
                console.log("child process closed successfully with code = " + code);
            })
        })
    })
}
const javaCompiler = (codeId,codeInput) => {
    return new Promise((resolve, reject) => {
        let output;
        var codeOutputFile = fs.createWriteStream(path.join(__dirname, "..", "codeFiles", `codeOutputjava${codeId}.txt`),{})
        const filePath = path.join(__dirname,"..","codeFiles",`${codeId}.java`);
        let pythonScript = spawn("java", [ filePath ]);
        let errorFilePath = path.join(__dirname,"..","errors",`errors-${codeId}.txt`);
        let errorPathStream = fs.createWriteStream(errorFilePath);
        pythonScript.stdout.on("data", (data) => {
            let dataReq = data.toString();
            output = dataReq;
            console.log(dataReq);
        })
        pythonScript.stdin.write(codeInput);
        pythonScript.stdin.end();
        codeOutputFile.on("open", () => {
            pythonScript.stdout.pipe(codeOutputFile);
        })
        codeOutputFile.on("error", (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
        })
        pythonScript.stderr.on("data",(stderr) => {
            pythonScript.stderr.pipe(errorPathStream);
            reject({err:stderr, errorFilePath});
            console.log(stderr.toString());
        })
        codeOutputFile.on("finish", () => {
            console.log("stream closed successfully");
            resolve({output,codeOutputFile:filePath});
        })
        pythonScript.on("error",(err) => {
            console.log(err);
        })
        pythonScript.on("close", (code) => {
            console.log("child process closed successfully with code = " + code);
        })
    })
}
module.exports = {
    pyCompiler,
    jsCompiler,
    cppCompiler,
    javaCompiler
}
//// ----> ab-de+f*/ => (a-b)/((d+e)*f)
// a + b / c*(d+e)-f =>  abc/de+*+f-