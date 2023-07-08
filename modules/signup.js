// Get the file handling module in node | To access file
const fs = require('fs');


// Append a new user to current user list users.csv
const addUserToFile = async function(path, data){
    // Get file current users list (from users.csv)
    const usersFileOldBuff = fs.readFileSync(path);
    const usersFileOld = usersFileOldBuff.toString();
    let newId = usersFileOld.split("\n").length;
    
    data = `\n${newId},${data}`;
    await fs.appendFile(path, data, function(error){
        if (error){
            console.log(error);
        }
        else {
        // Get file new content | check
        const usersFileNewBuff =  fs.readFileSync(path);
        const usersFileNew = usersFileNewBuff.toString();
        console.log(`${data} has been added to list of users.`);
        }
    })
};

// Export module for global use across other files
module.exports.addUserToFile = addUserToFile;