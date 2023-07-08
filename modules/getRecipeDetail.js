// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');
var getUserData = require('./getUserData');



// Get recipe's data
const getRecipeDetail = function getRecipeDetail(recipeFile, recipeID){
    
    // Access recipes file
    const recipesFileBuff = fs.readFileSync(recipeFile);
    // Convert csv to JSON file to make it usable
    const recipesFile = recipesFileBuff.toString();
    const recipesArray = csvtoArray.csvtoArray(recipesFile, '\n');
    const recipesJSON = arraytoJSON.arraytoJSON(recipesArray);
   
    // Get recipeDetail
    let recipeDetail = {}
    
    const totalRecipes = recipesJSON.length;
   
    for (let i = 0; i < totalRecipes; i++){
        if (recipeID == recipesJSON[i]['recipe_id']){
            recipeDetail['user_id'] = recipesJSON[i]['user_id'];
            recipeDetail['username'] = recipesJSON[i]['username'];
            recipeDetail['recipe_name'] = recipesJSON[i]['recipe_name'];
            recipeDetail['recipe_category'] = recipesJSON[i]['recipe_category'];
            recipeDetail['recipe_photo'] = recipesJSON[i]['recipe_photo'];
            recipeDetail['recipe_notes'] = recipesJSON[i]['recipe_notes'];
        }
    }
    return recipeDetail;
}


module.exports.getRecipeDetail = getRecipeDetail;