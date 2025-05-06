const express = require('express');
const authRouter= express.Router();
const {resister,login,logout}= require('../controllers/userAuthent')

//Resister
authRouter.post('register',resister);

authRouter.post('login',login);

authRouter.post('logout',logout);


// authRouter.get('getProfile',getProfile);

module.exports= authRouter;
// Login


// logout

// getprofile