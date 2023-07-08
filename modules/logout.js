// Get modules
const fs = require('fs');

// Erase data on currentLog file
const logout = function(cookieFile){
    const currentLog = fs.truncate(cookieFile, 0, function(){
        console.log('Logged out');
    });
}

module.exports.logout = logout;
