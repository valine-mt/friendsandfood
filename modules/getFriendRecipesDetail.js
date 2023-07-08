// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');
var getUserData = require('./getUserData');
var getUserPhoto = require('./getUserPhoto');


// Get recipe's data
const getFriendRecipesDetail = function getFriendRecipesDetail(recipeFile, friendID){
    
    // Access recipes file
    const recipesFileBuff = fs.readFileSync(recipeFile);
    // Convert csv to JSON file to make it usable
    const recipesFile = recipesFileBuff.toString();
    const recipesArray = csvtoArray.csvtoArray(recipesFile, '\n');
    const recipesJSON = arraytoJSON.arraytoJSON(recipesArray);
   
    // Get list of all friend's recipes
    let friendRecipesDetail = []
    
    const totalRecipes = recipesJSON.length;

    for (let i = 0; i < totalRecipes; i++){
        let friendRecipeDetail = {}
        if (friendID == recipesJSON[i]['user_id']){
            friendRecipeDetail['username'] = recipesJSON[i]['username'];
            friendRecipeDetail['recipe_id'] = recipesJSON[i]['recipe_id'];
            friendRecipeDetail['recipe_name'] = recipesJSON[i]['recipe_name'];
            friendRecipeDetail['creator_photo'] = getUserPhoto.getUserPhoto('./db/users.csv', recipesJSON[i]['user_id']);
            friendRecipeDetail['recipe_category'] = recipesJSON[i]['recipe_category'];
            friendRecipeDetail['recipe_photo'] = recipesJSON[i]['recipe_photo'];
            friendRecipeDetail['recipe_notes'] = recipesJSON[i]['recipe_notes'];
            friendRecipesDetail.push(friendRecipeDetail);
        }
    }
    return friendRecipesDetail;
}


module.exports.getFriendRecipesDetail = getFriendRecipesDetail;