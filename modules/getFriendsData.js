// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');

const getFriendsPhoto = function(usersFile, userCheck){
    const listUsersBuff = fs.readFileSync(usersFile);
    const listUsers = listUsersBuff.toString();
    const listUsersArray =  csvtoArray.csvtoArray(listUsers, '\n');
    const listUsersJSON = arraytoJSON.arraytoJSON(listUsersArray);

    let friend_photo = '';
    let n = listUsersJSON.length;
    for (let i = 0; i < n; i++){
        if (userCheck == listUsersJSON[i]['userCheck']){
            friend_photo = listUsersJSON[i]['user_photo'];
            return friend_photo
        }
    }
}

// Display user's friends
const getFriendsData = function(listFriendsFile, loginFile){
    const listFriendsBuff = fs.readFileSync(listFriendsFile);
    const listFriends = listFriendsBuff.toString();
    const listFriendsArray =  csvtoArray.csvtoArray(listFriends, '\n');
    const listFriendsJSON = arraytoJSON.arraytoJSON(listFriendsArray);

    const cookieFileBuff = fs.readFileSync(loginFile);
    const cookieFile = cookieFileBuff.toString();
    const cookieArray = csvtoArray.csvtoArray(cookieFile, '\r\n');

    const totalFriends = listFriendsArray.length - 1;
    let friendsList = [];
    for (let i = 0; i < totalFriends; i++){
        let friendBuffer = {}
        if (listFriendsJSON[i]['user_id'] == cookieArray[0][0]){
            friendBuffer['friend_name'] = listFriendsJSON[i]['friend_name'];
            friendBuffer['friend_id'] = listFriendsJSON[i]['friend_id'];
            friendBuffer['friend_photo'] = listFriendsJSON[i]['friend_photo'];
            friendsList.push(friendBuffer);
        }
    };
    return friendsList;
}

module.exports.getFriendsData = getFriendsData;
module.exports.getFriendsPhoto = getFriendsPhoto;