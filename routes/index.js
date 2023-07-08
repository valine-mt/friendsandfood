var express = require('express');
var router = express.Router();

/* GET home page. Login page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});


/*  GET signup page */
router.get('/signup', function(req, res, next){
  res.render('signup', { title: 'Sign me up!' })
})

/*  GET login page after successfully signed up */
router.get('/login', function(req, res, next){
  res.render('login', { title: 'Congratulations! You are now signed up and can login now.' })
})

var logout = require('../modules/logout');
/*  GET logout page */
router.get('/logout', function(req, res, next){
  logout.logout('./db/currentLog.csv');
  res.render('logout');
})

/*  GET logout page */
router.get('/logerror', function(req, res, next){
  res.render('logerror', { title: 'Error' });
})



var displayRecipes = require('../modules/displayLatestRecipes');
var getUserData = require('../modules/getUserData');


/*  GET home page */
router.get('/home', function(req, res, next){
  // Render recipes on home page
  const username = getUserData.getUserData('./db/currentLog.csv')['username'];
  const user_photo = getUserData.getUserData('./db/currentLog.csv')['user_photo'];
  const LatestUserRecipes = displayRecipes.displayUserLatestRecipes('./db/recipes.csv', './db/currentLog.csv');
  const n = LatestUserRecipes.length;
  const LatestFriendsRecipes = displayRecipes.displayFriendsLatestRecipes('./db/recipes.csv', './db/currentLog.csv', './db/friends.csv');
  const o = LatestFriendsRecipes.length;
  
  res.render('home', { 
    title: 'Home',
    hello: 'hello',
    n: n,
    o: o,
    user_photo: user_photo,
    username: username,
    LatestUserRecipes: LatestUserRecipes,
    LatestFriendsRecipes: LatestFriendsRecipes
   });
})

var getFriendsData = require('../modules/getFriendsData');
/*  GET list-friends page */
router.get('/list-friends', function(req, res, next){
  const listFriendsData = getFriendsData.getFriendsData('./db/friends.csv', './db/currentLog.csv')
  let n = listFriendsData.length;
  let listFriends = []
  for (let i = 0; i < n; i++){
    let listFriendBuff = {};
    listFriendBuff['friend_name'] = listFriendsData[i]['friend_name'];
    listFriendBuff['friend_photo'] = listFriendsData[i]['friend_photo'];
    listFriendBuff['friend_id'] = listFriendsData[i]['friend_id'];
    listFriends.push(listFriendBuff);
  }
  res.render('list-friends', { 
    title: 'List Friends',
    n: n,
    listFriends: listFriends
   });
})

var displayListRecipes = require('../modules/displayListRecipes');
/*  GET list-recipes page */
router.get('/list-recipes', function(req, res, next){
  // To change DB files, go to displayListRecipes.js
  const userListRecipes = displayListRecipes.displayUserListRecipes();
  let n = userListRecipes.length;
  const friendsListRecipes = displayListRecipes.displayFriendsListRecipes();
  let o = friendsListRecipes.length;
  if (n > 0 || o > 0){
    res.render('list-recipes', {
      title: 'All recipes',
      userListRecipes: userListRecipes,
      n: n,
      friendsListRecipes: friendsListRecipes,
      o: o
    });
  }
  else{
    res.render('noRecipe', {
      title: 'There is currently no recipes registered in the DB. Add a Recipe.',
    });
  }
})


/*  Render recipe page */
router.get('/recipeDetail', function(req, res, next){
  res.render('recipeDetail');
})

/*  Render friend's recipes page */
router.get('/friend-recipes-detail', function(req, res, next){
  res.render('friend-recipes-detail');
})



/*  GET add-friend page */
router.get('/add-friend', function(req, res, next){
  res.render('add-friend', { title: 'Add a friend' });
})

/*  GET add-recipe page */
router.get('/add-recipe', function(req, res, next){
  res.render('add-recipe', { title: 'Add a recipe' });
})


/*  GET style page */
router.get('/styles', function(req, res, next){
  res.render('styles.css');
})


module.exports = router;
