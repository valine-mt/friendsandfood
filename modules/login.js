// Get modules
const fs = require('fs'); 
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');


// Keep track of current log in csv file
const addCookie = async function(path, data){
    data = `${data}`;

    await fs.writeFile(path, data, function(error){
        if (error){
            console.log(error);
        }
        else {
        // Get file current
        const currentLogBuff =  fs.readFileSync('./db/currentLog.csv')
        const currentLog = currentLogBuff.toString();
        console.log(`${currentLog} has just logged in.`);
        }
    });

};


// Check user's existence in csv
const checkUserID = function(file, logName, logPassword){
    // Get file current users list (from users.csv) to check if username exists in user.csv file
    const loginFileBuffer = fs.readFileSync(file);
    const loginFile = loginFileBuffer.toString();
    const loginFileArray = csvtoArray.csvtoArray(loginFile, '\n');
    const loginFileDictionary = arraytoJSON.arraytoJSON(loginFileArray);
    let userData = {};
    for (let i = 0, n = loginFileDictionary.length; i < n; i++){
        if (loginFileDictionary[i]['userCheck'] == logName){
            // Check password
            if (loginFileDictionary[i]['password'] == logPassword){
                console.log('Correct');
                userData['user_id'] = loginFileDictionary[i]['user_id'];
                userData['userCheck'] = loginFileDictionary[i]['userCheck'];
                userData['username'] = loginFileDictionary[i]['username'];
                userData['user_photo'] = loginFileDictionary[i]['user_photo'];
                return userData;
            }
            else{
                console.log('Incorrect Password');
            }
        }
        else {
            console.log('User not found');
        }
    }
};


module.exports.addCookie = addCookie;
module.exports.checkUserID = checkUserID;