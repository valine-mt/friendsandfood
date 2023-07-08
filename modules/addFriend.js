// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');

const getNewFriendID = function(path, friendName){
    // Access user's file
    const userFileBuff = fs.readFileSync(path);
    const userFile = userFileBuff.toString();
    const userFileArray = csvtoArray.csvtoArray(userFile, '\n');
    const userFileJSON = arraytoJSON.arraytoJSON(userFileArray);
    
    // Get new friend's user_id
    n = userFileJSON.length;
    for (let i = 0; i < n; i++){
        if (friendName == userFileJSON[i]['userCheck']){
            let newFriendId = userFileJSON[i]['user_id'];
            return newFriendId
         }
    };
    console.log('Cannot add friend. User not found')
}


const getNewFriendUsername = function(path, friendName){
    // Access user's file
    const userFileBuff = fs.readFileSync(path);
    const userFile = userFileBuff.toString();
    const userFileArray = csvtoArray.csvtoArray(userFile, '\n');
    const userFileJSON = arraytoJSON.arraytoJSON(userFileArray);
    
    // Get new friend's user_id
    n = userFileJSON.length;
    for (let i = 0; i < n; i++){
        if (friendName == userFileJSON[i]['userCheck']){
            let newFriendUsername = userFileJSON[i]['username'];
            return newFriendUsername
         }
    };
    console.log('Cannot add friend. User not found')

}


// Function to add a friend
const addFriend = async function(path, data){
   data = `${data}`;
   await fs.appendFile(path, data, function(error){
    if (error){
        console.log(error);
    }
    else {
        // Get file new content | check
        const newBuff =  fs.readFileSync(path)
        const newContent = newBuff.toString();
        }
   })
}


module.exports.getNewFriendID = getNewFriendID;
module.exports.getNewFriendUsername = getNewFriendUsername;
module.exports.addFriend = addFriend;