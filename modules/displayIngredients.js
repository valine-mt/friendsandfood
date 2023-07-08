// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');

// Display ingredients
const displayIngredients = function displayIngredients(ingredientsFile, recipe_id){
    const ingredientsFileBuff = fs.readFileSync(ingredientsFile);
    const ingredientsFileStr = ingredientsFileBuff.toString();
    const ingredientsFileArray = csvtoArray.csvtoArray(ingredientsFileStr, '\n');
    const ingredientsFileJSON = arraytoJSON.arraytoJSON(ingredientsFileArray);

    const totalRecipes = ingredientsFileJSON.length;

    let ingredientsListBuff = []

    for (let i = 0; i < totalRecipes; i++){
        if (recipe_id == ingredientsFileJSON[i]['recipe_id']){
            // Get all values of dictionary in a list
            ingredientsListBuff = Object.values(ingredientsFileJSON[i]);
        }
    }

    // Remove recipe_id
    ingredientsListBuff.shift();

    // Remove empty ingredients
    let o = '';
    let n = ingredientsListBuff.length;
    for (let j = 0; j < n; j++){
        if (ingredientsListBuff[j] == ''){
            o = j;
            break;
        }
    }
    const ingredientsList = ingredientsListBuff.slice(0,o);

    return ingredientsList;
}


module.exports.displayIngredients = displayIngredients;