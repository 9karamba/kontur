const fs = require('fs');
const path = require('path');
 
function readFiles(directoryPath){ 

    const readDir = new Promise((resolve, reject) => { 

        fs.readdir(directoryPath, (err, filenames) => {
            if(err) reject(err);

            resolve(filenames)
        });

    }); 

    return readDir
        .then(filenames => Promise.all(filenames.map((filename) => { 
            filePath = path.join(directoryPath,filename);
            
            if(fs.statSync(filePath).isDirectory())
                return readFiles(filePath);
            
            if(path.extname(filename) == ".js")
                return new Promise ((resolve, reject) => { 
                    
                    fs.readFile(filePath, 'utf-8', (err, content) => {
                        if(err) reject(err);

                        resolve(filename+"\n"+content);
                    }); 

                });

        }))
        .catch(error => Promise.reject(error))) 
}; 

module.exports = {
    readFiles,
};
