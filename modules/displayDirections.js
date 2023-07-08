// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');

// Display directions
const displayDirections = function displayDirections(directionsFile, recipe_id){
    const directionsFileBuff = fs.readFileSync(directionsFile);
    const directionsFileStr = directionsFileBuff.toString();
    const directionsFileArray = csvtoArray.csvtoArray(directionsFileStr, '\n');
    const directionsFileJSON = arraytoJSON.arraytoJSON(directionsFileArray);

    const totalRecipes = directionsFileJSON.length;

    let directionsListBuff = []

    for (let i = 0; i < totalRecipes; i++){
        if (recipe_id == directionsFileJSON[i]['recipe_id']){
            // Get all values of dictionary in a list
            directionsListBuff = Object.values(directionsFileJSON[i]);
        }
    }

    // Remove recipe_id
    directionsListBuff.shift();

    // Remove empty directions
    let o = '';
    let n = directionsListBuff.length;
    for (let j = 0; j < n; j++){
        if (directionsListBuff[j] == ''){
            o = j;
            break;
        }
    }
    const directionsList =directionsListBuff.slice(0,o);

    return directionsList;
}


module.exports.displayDirections = displayDirections;