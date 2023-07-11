// Get modules
const fs = require('fs');
var csvtoArray = require('./csvtoArray');
var arraytoJSON = require('./arraytoJSON');
var getFriendsData = require('./getFriendsData');
var getUserData = require('./getUserData');
var getUserPhoto = require('./getUserPhoto');

// Display all user's recipes
const displayUserListRecipes = function(){
    const listRecipesBuff =  fs.readFileSync('./db/recipes.csv');
    const listRecipes = listRecipesBuff.toString();
    const listRecipesArray = csvtoArray.csvtoArray(listRecipes, '\n');
    const listRecipesJSON = arraytoJSON.arraytoJSON(listRecipesArray);
    
    const totalRecipes = listRecipesJSON.length;
    let userListRecipes = []
    
    for (let i = 0; i < totalRecipes; i++){
        let recipeBuffer = {};
        if (listRecipesJSON[i]['user_id'] == getUserData.getUserData('./db/currentLog.csv')['userID']){
            recipeBuffer['creator_id'] = listRecipesJSON[i]['user_id'];
            recipeBuffer['user_photo'] = getUserPhoto.getUserPhoto('./db/users.csv', listRecipesJSON[i]['user_id']);
            recipeBuffer['recipe_category'] = listRecipesJSON[i]['recipe_category'];
            recipeBuffer['recipe_name'] = listRecipesJSON[i]['recipe_name'];
            recipeBuffer['recipe_id'] = listRecipesJSON[i]['recipe_id'];
            recipeBuffer['recipe_photo'] = listRecipesJSON[i]['recipe_photo'];
            recipeBuffer['recipe_notes'] = listRecipesJSON[i]['recipe_notes'];
            userListRecipes.push(recipeBuffer);
        }
    }
    return userListRecipes;
}

const listFriends = getFriendsData.getFriendsData('./db/friends.csv','./db/currentLog.csv');
const totalFriends = listFriends.length;

const displayFriendsListRecipes = function(){
    const listRecipesBuff =  fs.readFileSync('./db/recipes.csv');
    const listRecipes = listRecipesBuff.toString();
    const listRecipesArray = csvtoArray.csvtoArray(listRecipes, '\n');
    const listRecipesJSON = arraytoJSON.arraytoJSON(listRecipesArray);
    
    const totalRecipes = listRecipesJSON.length;
    let friendsListRecipes = []
    for (let j = 0; j < totalRecipes; j++){
        for (let k = 0; k < totalFriends; k++){
            let friendsRecipeBuffer = {};
            if (listRecipesJSON[j]['user_id'].includes(listFriends[k]['friend_id'])){
                friendsRecipeBuffer['creator_id'] = listRecipesJSON[j]['user_id'];
                friendsRecipeBuffer['friend_photo'] = getUserPhoto.getUserPhoto('./db/users.csv', listRecipesJSON[j]['user_id']);
                friendsRecipeBuffer['creator_name'] = listRecipesJSON[j]['username'];
                friendsRecipeBuffer['recipe_category'] = listRecipesJSON[j]['recipe_category'];
                friendsRecipeBuffer['recipe_name'] = listRecipesJSON[j]['recipe_name'];
                friendsRecipeBuffer['recipe_id'] = listRecipesJSON[j]['recipe_id'];
                friendsRecipeBuffer['recipe_photo'] = listRecipesJSON[j]['recipe_photo'];
                friendsRecipeBuffer['recipe_notes'] = listRecipesJSON[j]['recipe_notes'];
                friendsListRecipes.push(friendsRecipeBuffer);
                
            }
            
        }
    }
    return friendsListRecipes;
};


module.exports.displayUserListRecipes = displayUserListRecipes;
module.exports.displayFriendsListRecipes = displayFriendsListRecipes;
