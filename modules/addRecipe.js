// Get the file handling module in node | To access file
const fs = require('fs');

const getNewRecipeId = function(path){
    // Get file current recipes list (from recipes.csv)
    const recipeListOldBuff = fs.readFileSync(path);
    const recipeListOld = recipeListOldBuff.toString();
    let newId = recipeListOld.split("\n").length;
    return newId;
}

// Append a new recipe to current recipes list recipes.csv
const addRecipe = async function(path, data){
    data = `${data}`;
    await fs.appendFile(path, data, function(error){
        if (error){
            console.log(error);
        }
        else {
        // Get file new content | check
        const recipeListNewBuff =  fs.readFileSync(path)
        const recipeListNew = recipeListNewBuff.toString();
        console.log(`${data} has been added to list of recipes.`);
        }
    })
};


module.exports.addRecipe = addRecipe;
module.exports.getNewRecipeId = getNewRecipeId;