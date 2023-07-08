// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');
var getUserData = require('./getUserData');
var getUserPhoto = require('./getUserPhoto');


// Display user's latest recipes
const displayUserLatestRecipes = function displayUserLatestRecipes(recipeFile, loginFile){
    
    // Access recipes and cookie files
    const recipesFileBuff = fs.readFileSync(recipeFile);
    // Convert csv to JSON file to make them usable
    const recipesFile = recipesFileBuff.toString();
    const recipesArray = csvtoArray.csvtoArray(recipesFile, '\n');
    const recipesJSON = arraytoJSON.arraytoJSON(recipesArray);
   
    // Get latest recipes from user
    let latestRecipes = [];
    let numberRecipes = 0;
    const totalRecipes = recipesJSON.length - 1;
   
    for (let i = totalRecipes; i >= 0; i--){
        if (numberRecipes < 5){
            if (recipesJSON[i]['user_id'] == getUserData.getUserData('./db/currentLog.csv')['userID']){
                let elementRecipe = {};
                elementRecipe['username'] =  recipesJSON[i]['username'];
                elementRecipe['recipe_name'] =  recipesJSON[i]['recipe_name'];
                elementRecipe['recipe_photo'] =  recipesJSON[i]['recipe_photo'];
                elementRecipe['recipe_id'] =  recipesJSON[i]['recipe_id'];
                elementRecipe['recipe_notes'] =  recipesJSON[i]['recipe_notes'];
                numberRecipes++;
                latestRecipes.push(elementRecipe);
            }
        }
    }
    return latestRecipes;
}


// Display user's friends latest recipes
const displayFriendsLatestRecipes = function displayFriendsLatestRecipes(recipeFile, loginFile, friendFile){
    // Access recipes and cookie files
    const recipesFileBuff = fs.readFileSync(recipeFile);
    const friendsFileBuff = fs.readFileSync(friendFile);
    // Convert csv to JSON file to make them usable
    const recipesFile = recipesFileBuff.toString();
    const friendsFile = friendsFileBuff.toString();
    const friendsArray = csvtoArray.csvtoArray(friendsFile, '\n');
    const friendsJSON = arraytoJSON.arraytoJSON(friendsArray);
    const recipesArray = csvtoArray.csvtoArray(recipesFile, '\n');
    const recipesJSON = arraytoJSON.arraytoJSON(recipesArray);


    // Get recipes names and photos of user's friends
    let latestFriendsRecipes = [];
    let numberFriendsRecipes = 0;
    let friendsID = [];
    const totalFriends = friendsArray.length - 1;
    // Get list of logged in user's friends
    for (let j = 0; j < totalFriends; j++){
        if(friendsJSON[j]['user_id'] == getUserData.getUserData('./db/currentLog.csv')['userID']){
            friendsID.push(friendsJSON[j]['friend_id']);
        }
    }

    const totalRecipes = recipesJSON.length - 1;
    // Get latest recipes and photos from these friends
    for (let k = totalRecipes; k >= 0; k--){
        if (numberFriendsRecipes < 5){
            if (friendsID.includes(recipesJSON[k]['user_id'])){
                let elementRecipe = {};
                elementRecipe['friend_name'] = recipesJSON[k]['username'];
                elementRecipe['friend_id'] = recipesJSON[k]['user_id'];
                elementRecipe['friend_photo'] = getUserPhoto.getUserPhoto('./db/users.csv', recipesJSON[k]['user_id']);
                elementRecipe['recipe_name'] = recipesJSON[k]['recipe_name'];
                elementRecipe['recipe_id'] = recipesJSON[k]['recipe_id'];
                elementRecipe['recipe_photo'] = recipesJSON[k]['recipe_photo'];
                elementRecipe['recipe_notes'] = recipesJSON[k]['recipe_notes'];
                numberFriendsRecipes++;
                latestFriendsRecipes.push(elementRecipe);
            }
        }
    }
    return latestFriendsRecipes;
}


module.exports.displayUserLatestRecipes = displayUserLatestRecipes;
module.exports.displayFriendsLatestRecipes = displayFriendsLatestRecipes;