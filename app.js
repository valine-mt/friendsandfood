var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var PORT = 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Express modules for uploading files/ photos etc.
const multer  = require('multer');
var storage = multer.diskStorage({
  // Destination where to store image
  destination: function(req, file, callback){
    callback(null, 'public/images')
  },
  // Name of file
  filename: function(req, file, callback){
    callback(null, file.originalname)
  }
});
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/signup', express.static('public/images'));
app.use('/add-recipe', express.static('public/images'));



// SIGN UP
var signup = require('./modules/signup');
// Handle post requests (e.g., user's inputs) from index file
indexRouter.post('/signup', upload.single('userPhoto'), function(req, res, next){
  const username = req.body.username;
  const userCheck = username.toLowerCase();
  const password = req.body.password;
  const userPhoto = '/images/' + req.file.filename;
  // Call function module
  signup.addUserToFile('./db/users.csv', `${username},${password},${userCheck},${userPhoto}`);
  res.redirect('/login');
});


// LOGIN AFTER SIGNUP
var login = require('./modules/login');
// Check whether the username and password entered by user are valid
indexRouter.post("/login", function(req, res, next){
    const loginUsername = req.body.loginUsername.toLowerCase();
    const loginPassword = req.body.loginPassword;
    const userData = login.checkUserID('./db/users.csv', loginUsername, loginPassword);
    if (userData){
      const user_id = userData['user_id'];
      const userCheck = userData['userCheck'];
      const username = userData['username'];
      const user_photo = userData['user_photo'];
      login.addCookie('./db/currentLog.csv', `${user_id},${userCheck},${username},${user_photo}`);
      res.redirect('/home');
    }
    else{
      res.redirect('/logerror');
    }
    
});


// LOGIN HOME
var login = require('./modules/login');
// Check whether the username and password entered by user are valid
indexRouter.post('/index', function(req, res, next){
    const loginUsername = req.body.loginUsername.toLowerCase();
    const loginPassword = req.body.loginPassword;
    const userData = login.checkUserID('./db/users.csv', loginUsername, loginPassword);
    if (userData){
      const user_id = userData['user_id'];
      const userCheck = userData['userCheck'];
      const username = userData['username'];
      const user_photo = userData['user_photo'];
      login.addCookie('./db/currentLog.csv', `${user_id},${userCheck},${username},${user_photo}`);
      res.redirect('/home');
    }
    else{
      res.redirect('/logerror');
    }

});


// ADD RECIPE
var addRecipe = require('./modules/addRecipe');
var getUserData = require('./modules/getUserData');
var addDataToCSV = require('./modules/addDataToCSV');

// Add a new recipe to DB
indexRouter.post('/add-recipe', upload.single('recipePhoto'), function(req,res,next){
  // Add new recipe
  const user_id = getUserData.getUserData('./db/currentLog.csv')['userID'];
  const username = getUserData.getUserData('./db/currentLog.csv')['username'];
  const newRecipeId = addRecipe.getNewRecipeId('./db/recipes.csv')
  const recipeName = req.body.recipeName;
  const recipeCategory = req.body.recipeCategory;
  const recipePhoto = '/images/' + req.file.filename;
  const recipeNotesTmp = req.body.recipeNotes;
  let recipeNotes = '';
  if(recipeNotesTmp.includes(',')){
    recipeNotes = recipeNotesTmp.split(",").join(" ");
  }
  else{
    recipeNotes = recipeNotesTmp;
  }
  addRecipe.addRecipe('./db/recipes.csv', `\n${user_id},${username},${newRecipeId},${recipeName},${recipeCategory},${recipePhoto},${recipeNotes}`);
  
  // Add ingredients
  const ingredient_1 = req.body.ingredient_1;
  const ingredient_2 = req.body.ingredient_2;
  const ingredient_3 = req.body.ingredient_3;
  const ingredient_4 = req.body.ingredient_4;
  const ingredient_5 = req.body.ingredient_5;
  const ingredient_6 = req.body.ingredient_6;
  const ingredient_7 = req.body.ingredient_7;
  const ingredient_8 = req.body.ingredient_8;
  const ingredient_9 = req.body.ingredient_9;
  const ingredient_10 = req.body.ingredient_10;
  // Remove commas to avoid confusion in csv
  let ingredients = [newRecipeId, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, ingredient_6, ingredient_7, ingredient_8, ingredient_9, ingredient_10];
  const totalIngredients = ingredients.length;
  for (let i = 1; i < totalIngredients; i++){
    if (ingredients[i].toString().includes(',')){
      ingredients[i] = ingredients[i].split(",").join(" ");
    }
  }

  // Add directions
  addDataToCSV.addDataToCSV('./db/ingredients.csv', `\n${ingredients}`);
  const step_1 = req.body.step_1;
  const step_2 = req.body.step_2;
  const step_3 = req.body.step_3;
  const step_4 = req.body.step_4;
  const step_5 = req.body.step_5;
  const step_6 = req.body.step_6;
  const step_7 = req.body.step_7;
  const step_8 = req.body.step_8;
  const step_9 = req.body.step_9;
  const step_10 = req.body.step_10;
  // Remove commas to avoid confusion in csv
  let directions = [newRecipeId, step_1, step_2, step_3, step_4, step_5, step_6, step_7, step_8, step_9, step_10];
  const totalSteps = directions.length;
  for (let j = 1; j < totalSteps; j++){
    if (directions[j].toString().includes(',')){
      directions[j] = directions[j].split(",").join("");
    }
  }
  addDataToCSV.addDataToCSV('./db/directions.csv', `\n${directions}`);


  console.log("Recipe successfully added!")
  res.redirect('/list-recipes');
})

// ADD FRIEND
var addFriend = require('./modules/addFriend');
var getFriendsData = require('./modules/getFriendsData');
indexRouter.post('/add-friend', function(req,res,next){
  const user_id = getUserData.getUserData('./db/currentLog.csv')['userID'];
  const username = getUserData.getUserData('./db/currentLog.csv')['userCheck'];
  const friendNameInput = req.body.friendName;
  const friendNameCheck = friendNameInput.toLowerCase();
  const friend_name = addFriend.getNewFriendUsername('./db/users.csv', friendNameCheck);
  const friend_id = addFriend.getNewFriendID('./db/users.csv', friendNameCheck);
  const friend_photo = getFriendsData.getFriendsPhoto('./db/users.csv', friendNameCheck);
  if (friend_id) {
    addFriend.addFriend('./db/friends.csv', `\n${user_id},${username},${friend_id},${friend_name},${friend_photo}`);
    console.log("Friend successfully added!")
    res.redirect('/list-friends');
  }
  else{
    console.log('Cannot add friend. User not found.')
    res.render('noFriend', {
      title:'Cannot add friend. User not found'
    });
  }
})



// Hyperlinks (render from server side, using DB)
// Home Page
var getRecipeDetail = require('./modules/getRecipeDetail');
var displayIngredients = require('./modules/displayIngredients');
var displayDirections = require('./modules/displayDirections');
var getUserPhoto = require('./modules/getUserPhoto');
indexRouter.post('/home', function(req,res,next){
  const recipeID = req.body.recipeID;
  const recipeDetail = getRecipeDetail.getRecipeDetail('./db/recipes.csv', recipeID);
  const ingredientsList = displayIngredients.displayIngredients('./db/ingredients.csv', recipeID);
  const n = ingredientsList.length;
  const directionsList = displayDirections.displayDirections('./db/directions.csv', recipeID);
  const o = directionsList.length;
  const recipe_creator_photo = getUserPhoto.getUserPhoto('./db/users.csv', recipeDetail['user_id'])
  res.render('recipeDetail',{
    ingredientsList: ingredientsList,
    n: n,
    directionsList: directionsList,
    o: o,
    recipeDetail: recipeDetail,
    recipe_creator_photo: recipe_creator_photo
  });
})

// List of recipes Page
indexRouter.post('/list-recipes', function(req,res,next){
  const recipeID = req.body.recipeID;
  const recipeDetail = getRecipeDetail.getRecipeDetail('./db/recipes.csv', recipeID);
  const ingredientsList = displayIngredients.displayIngredients('./db/ingredients.csv', recipeID);
  const n = ingredientsList.length;
  const directionsList = displayDirections.displayDirections('./db/directions.csv', recipeID);
  const recipe_creator_photo = getUserPhoto.getUserPhoto('./db/users.csv', recipeDetail['user_id'])
  const o = directionsList.length;
  res.render('recipeDetail',{
    ingredientsList: ingredientsList,
    n: n,
    directionsList: directionsList,
    o: o,
    recipeDetail: recipeDetail,
    recipe_creator_photo: recipe_creator_photo
  });
})

// List of friend's recipe
// All of friend's recipes
var getFriendRecipesDetail = require('./modules/getFriendRecipesDetail');
indexRouter.post('/list-friends', function(req,res,next){
  const friendID = req.body.friendID;
  const friendRecipesDetail = getFriendRecipesDetail.getFriendRecipesDetail('./db/recipes.csv', friendID);
  const n = friendRecipesDetail.length;
  res.render('friend-recipes-detail',{
    n: n,
    friendRecipesDetail: friendRecipesDetail
  });
})
// Detail of friend's recipe (when click on it)
indexRouter.post('/friend-recipes-detail', function(req,res,next){
  const recipeID = req.body.recipeID;
  const recipeDetail = getRecipeDetail.getRecipeDetail('./db/recipes.csv', recipeID);
  const ingredientsList = displayIngredients.displayIngredients('./db/ingredients.csv', recipeID);
  const n = ingredientsList.length;
  const directionsList = displayDirections.displayDirections('./db/directions.csv', recipeID);
  const o = directionsList.length;
  const recipe_creator_photo = getUserPhoto.getUserPhoto('./db/users.csv', recipeDetail['user_id'])
  res.render('recipeDetail',{
    ingredientsList: ingredientsList,
    n: n,
    directionsList: directionsList,
    o: o,
    recipeDetail: recipeDetail,
    recipe_creator_photo: recipe_creator_photo
  });
})

// Create http server for browser testing
var http = require("http");
http.createServer(app).listen(PORT);

module.exports = app;
