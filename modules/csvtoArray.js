// Convert csv file into array of dictionary (JSON format)
const csvtoArray = function(csvFile, splitSeparator){
    csvArray = []
    csvFile.split(splitSeparator).map(function(row){
        csvArray.push(row.split(','));
    });
    return csvArray;
};


// Export module for global use across other files
module.exports.csvtoArray = csvtoArray;
