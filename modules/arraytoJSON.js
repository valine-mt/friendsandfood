// Convert array of array into array of dictionary (JSON format)
const arraytoJSON = function(array){
    let fileJSON = [];
    for (let j = 1, n = array.length; j < n; j++){
        let elementBuffer = {};
        // Headers of csv file
        for (let i = 0, o = array[0].length; i < o; i++){ 
            elementBuffer[array[0][i]] = array[j][i];
        }
       fileJSON.push(elementBuffer);
    }
    return fileJSON;
};


// Export module for global use across other files
module.exports.arraytoJSON = arraytoJSON;