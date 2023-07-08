// Get the file handling module in node | To access file
const fs = require('fs');

const getNewId = function(filePath){
    // Get file current content from file.csv
    const fileOldBuff = fs.readFileSync(filePath);
    const fileOldStr = fileOldBuff.toString();
    let newId = fileOldStr.split("\n").length;
    return newId;
}

// Append a row to current file.csv
const addDataToCSV = async function(filePath, data){
    data = `${data}`;
    await fs.appendFile(filePath, data, function(error){
        if (error){
            console.log(error);
        }
        else {
        // Get file new content | check
        const fileNewBuff =  fs.readFileSync(filePath)
        const fileNewStr = fileNewBuff.toString();
        console.log(`${data} has been added to list of ${filePath}.`);
        }
    })
};


module.exports.addDataToCSV = addDataToCSV;
module.exports.getNewId = getNewId;