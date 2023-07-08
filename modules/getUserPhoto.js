// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');

const getUserPhoto = function(usersFile, userID){
    const listUsersBuff = fs.readFileSync(usersFile);
    const listUsers = listUsersBuff.toString();
    const listUsersArray =  csvtoArray.csvtoArray(listUsers, '\n');
    const listUsersJSON = arraytoJSON.arraytoJSON(listUsersArray);

    let user_photo = '';
    let n = listUsersJSON.length;
    for (let i = 0; i < n; i++){
        if (userID == listUsersJSON[i]['user_id']){
            user_photo = listUsersJSON[i]['user_photo'];
        }
    }
    return user_photo;
}

module.exports.getUserPhoto = getUserPhoto;
