// Get modules
const fs = require('fs'); 
var csvtoArray = require('./csvtoArray');

const getUserData = function(currentLogFile){
    let userData = {}
    const currentLogBuffer = fs.readFileSync(currentLogFile);
    const currentLog = currentLogBuffer.toString();
    const currentLogArray = csvtoArray.csvtoArray(currentLog);
    userData['userID'] = currentLogArray[0][0];
    userData['userCheck'] = currentLogArray[0][1];
    userData['username'] = currentLogArray[0][2];
    userData['user_photo'] = currentLogArray[0][3];
    return userData
}

module.exports.getUserData = getUserData;